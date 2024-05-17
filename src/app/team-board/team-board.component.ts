import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/services/api/api.service';
// import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { GoogleService } from '../shared/services/google/google.service';
import { TeamBoardType } from '../common/constants/AppEnum';
import { APIConstant } from '../common/constants/APIConstant';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TeamBoardModel } from '../common/models/TeamBoardModel';
// import { MapsAPILoader } from '@agm/core';
import { TeamBoardMapDataModel } from '../common/models/TeamBoardMapDataModel';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import axios from 'axios';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-team-board',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.scss'],
})
export class TeamBoardComponent implements OnInit {
  public showSpinner: Boolean = false;
  public TeamBoardType = TeamBoardType;
  public fieldData: any;
  public apiKey = environment.googleMapsApiKey;
  public address = [
    'Thane, Maharashtra, India',
    'C2/403, HDIL Residency park Phase 1, Virar West',
    'New York, NY, USA',
  ];
  public mapUrl!: SafeResourceUrl;
  latitude = 51.678418;
  longitude = 7.809007;
  // latitude = 0; // Set your initial latitude
  // longitude = 0; // Set your initial longitude
  zoom = 2; // Set the initial zoom level
  public markers!: TeamBoardMapDataModel[];
  selectedMarker: TeamBoardMapDataModel | null = null;
  map: L.Map | undefined;
  markerGroup = L.layerGroup();
  public isFilterApplied: boolean = false;

  teamBoardForm = this.fb.group({
    boardType: TeamBoardType.TEAM,
    language: [],
    county: [],
    profession: [],
    service_area: [],
  });
  public lngSettings!: IDropdownSettings;
  public countySettings!: IDropdownSettings;
  public serviceSettings!: IDropdownSettings;
  public profSettings!: IDropdownSettings;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private _googleService: GoogleService // private mapsAPILoader: MapsAPILoader
  ) {}

  ngOnInit() {
    this.getFieldData();
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.lngSettings = {
      singleSelection: false,
      idField: 'lid',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.countySettings = {
      singleSelection: false,
      idField: 'rid',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.serviceSettings = {
      singleSelection: false,
      idField: 'said',
      textField: 'service_area_title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.profSettings = {
      singleSelection: false,
      idField: 'prid',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {

  }

  private async addMarkersToMap(map: L.Map | undefined): Promise<void> {
    if (map) {
      try {
        let bounds;
        if (this.markers.length) {
          bounds = L.latLngBounds([]); // Initialize bounds object
        }
        this.map?.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            this.map?.removeLayer(layer);
          }
        });

        for (const markerData of this.markers) {
          const latLng = await this.getLatLngFromAddress(markerData.address);
          if (latLng) {
            bounds?.extend(latLng);
            const marker = L.marker(latLng).addTo(map);
            marker.bindPopup(this.createPopupContent(markerData));
            marker.on('mouseover', () => {
              const popupContent = this.createPopupContent(markerData);
              const popup = marker.bindPopup(popupContent).openPopup();
              const viewMoreBtn = document.getElementById('viewMoreBtn');
              if (viewMoreBtn) {
                viewMoreBtn.addEventListener('click', () => {
                  this.viewMore(markerData);
                  popup.closePopup(); // Close the popup when redirecting
                });
              }
            });
          }
        }
        if (bounds) map.fitBounds(bounds);
      } catch (err) {
        console.log(err);
      }
    }
  }

  private createPopupContent(markerData: any): string {
    return `
      <div>
        <h3
        style="line-height: 23px;
        font-weight: 500;">
       <span style="color: #005282;">  ${markerData.name} </span> <br>  <span style="color: #828282; font-size:15px"> ${markerData.profession} </span> </h3>
        <div style="padding-bottom: 5px;">
        <span style="font-weight: 600;
        color: black;"> Professional ID: </span>  ${markerData.pid}</div>
        <div style="padding-bottom: 5px">
        <span style="font-weight: 600;
        color: black;">Address: </span> ${markerData.address}</div>
        <div style="padding-bottom: 5px">
        <span style="font-weight: 600;
        color: black;">Languages: </span> ${markerData.languages}</div>
        <button id="viewMoreBtn" style="    margin-top: 10px;
        width: 101px;
        border-radius: 5px;
        box-shadow: none;
        background-color: #3c8dbc;
        color: #ffffff;
        padding: 4px;
        border: 1px solid blue;
        font-size: 13px; cursor:pointer" >View More</button>
        <!-- Add more data as needed -->
      </div>
    `;
  }

  private async getLatLngFromAddress(
    address: string
  ): Promise<L.LatLng | null> {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: address,
            format: 'json',
            limit: 1,
          },
        }
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return L.latLng(parseFloat(lat), parseFloat(lon));
      }
      return null;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  }

  public viewMore(marker: any) {
    this.router.navigate(['team-board/medical-team'], {
      state: { medicalId: marker.pid },
    });
  }
  public setBoardType(type: TeamBoardType) {
    if (this.teamBoardForm.get('boardType')?.value !== type) {
      this.teamBoardForm.patchValue({ boardType: type });
    }
  }

  getMapUrl() {
    const californiaCenter = '36.7783,-119.4179'; // Latitude, Longitude of California

    const zoomLevel = 6;

    // Construct the URL with the specified parameters
    const baseUrl = `https://www.google.com/maps/embed/v1/view?key=${this.apiKey}`;
    const queryParams = `&center=${californiaCenter}&zoom=${zoomLevel}`;
    const url = `${baseUrl}${queryParams}`;

    // Sanitize and return the URL
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateToView() {
    this.router.navigate(['/team-board/medical-team']);
  }

  public getFieldData() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICAL_FIELD_DATA).subscribe(
      (res: any) => {
        if (res) {
          this.fieldData = res;
        }
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
        this.showSpinner = false;
      }
    );
  }

  public onSubmit() {
    // console.log(this.teamBoardForm.value.language);
    if (this.isAnyControlFilled(this.teamBoardForm)) {
      const formModel: TeamBoardModel = {
        boardType: this.teamBoardForm.value.boardType || TeamBoardType.TEAM,
        language:
          (this.teamBoardForm.value.language
            ? this.teamBoardForm.value.language
            : []
          ).map((option: any) => option.lid) || [],
        county:
          (this.teamBoardForm.value.county
            ? this.teamBoardForm.value.county
            : []
          ).map((option: any) => option.rid) || [],
        profession:
          (this.teamBoardForm.value.profession
            ? this.teamBoardForm.value.profession
            : []
          ).map((option: any) => option.prid) || [],
        service_area:
          (this.teamBoardForm.value.service_area
            ? this.teamBoardForm.value.service_area
            : []
          ).map((option: any) => option.said) || [],
      };
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;

      this._apiService
        .post(APIConstant.FILTER_MEDICAL_TEAM, formData)
        .subscribe(
          async (res: any) => {
            if (res && res.status) {
              this.markers = res.data as TeamBoardMapDataModel[];
              await this.addMarkersToMap(this.map);
              this.showSpinner = false;
              this.isFilterApplied = true;
            } else {
              this.showSpinner = false;
              console.log(res.message);
            }
          },
          (error) => {
            console.log(error);
            this.showSpinner = false;
          }
        );
    }
  }
  public isAnyControlFilled(form: FormGroup): boolean {
    // Iterate through the controls of the form
    for (const controlName in form.controls) {
      if (
        controlName !== 'boardType' &&
        form.controls.hasOwnProperty(controlName)
      ) {
        const control = form.controls[controlName];

        // Check if the control has a non-null and non-empty value
        if (
          control.value !== null &&
          control.value !== '' &&
          control.value !== undefined
        ) {
          return true; // At least one control is filled
        }
      }
    }

    return false; // No control is filled
  }

  public reset() {
    this.teamBoardForm.patchValue({
      boardType: TeamBoardType.TEAM,
      language: null,
      county: null,
      profession: null,
      service_area: null,
    });
  }
}
