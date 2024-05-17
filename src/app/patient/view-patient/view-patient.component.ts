import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/common/constants/AppConstants';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrl: './view-patient.component.scss',
})
export class ViewPatientComponent implements OnInit {
  public patientData!: PatientModel;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  columns: Boolean = true;
  defaultTabIndex!: number;
  public appConstants = AppConstants;
  public address!: string;

  public patientProfile: any = [
    {
      label: 'Patient Name',
      key: 'name',
    },
    {
      label: 'Address',
      key: 'address',
    },
    {
      label: 'Time zone',
      key: 'time_zone',
    },
    {
      label: 'Telephone',
      key: 'telephone',
    },
    {
      label: 'Mobile No',
      key: 'mobile',
    },
    {
      label: 'Internal Notes',
      key: 'internal_notes',
    },
    {
      label: 'Special Notes',
      key: 'special_notes',
    },
  ];

  constructor(
    private responsiveObserver: ResponsiveService,
    private _apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.responsiveObserver.observeResolution().subscribe((columns) => {
      this.columns = columns;
      console.log(columns);
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    console.log('first refreshed');
  }

  ngAfterViewInit() {}

  ngOnInit() {
    let patientId = history.state.id;
    if (patientId) this.fetchPatientData(patientId);
    this.defaultTabIndex = (history && history.state.tabIndex) || 0;
    if (!patientId) this.router.navigate(['patients']);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isPageRefresh()) {
        }
      }
    });
  }

  private fetchPatientData(patientId: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('patient_id', patientId);
    this._apiService.post(APIConstant.GET_PATIENT_BY_ID, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.patientData = res.data;
          this.address = res.data.address;
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  isPageRefresh(): boolean {
    return (
      window.performance &&
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD
    );
  }

  getMapUrl() {
    const url = `https://www.google.com/maps/embed/v1/place?q=${this.address}&key=${this.apiKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateBack() {
    this.router.navigate(['patients']);
  }

  navigateToEdit() {
    this.router.navigate(['/patients/edit'], {
      state: { patientData: this.patientData },
    });
  }
}
