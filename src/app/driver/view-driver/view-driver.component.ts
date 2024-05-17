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
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrl: './view-driver.component.scss',
})
export class ViewDriverComponent implements OnInit {
  public showSpinner: Boolean = false;
  columns: Boolean = true;
  defaultTabIndex!: number;
  public apiKey = environment.googleMapsApiKey;
  public appConstants = AppConstants;
  public address!: string;
  public driverData!: any;

  public driverProfile: any = [
    {
      label: 'First name',
      key: 'first_name',
    },
    {
      label: 'Last name',
      key: 'last_name',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Mobile no.',
      key: 'mobile_no',
    },
  ];
  public driverDocument: any = [
    {
      label: 'Driving License',
      key: 'dl',
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
  ngAfterViewInit() {}

  ngOnInit() {
    let driverId = history.state.driverId;
    if (driverId) this.fetchDriverData(driverId);
    else this.router.navigate(['driver']);
    this.defaultTabIndex = (history && history.state.tabIndex) || 0;
  }
  private fetchDriverData(driverId: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('driver_id', driverId);
    this._apiService.post(APIConstant.GET_DRIVER_BY_ID, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          console.log(res.data);
          this.driverData = res.data;
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  getMapUrl() {
    const url = `https://www.google.com/maps/embed/v1/place?q=${this.address}&key=${this.apiKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateBack() {
    this.router.navigate(['ambulance']);
  }

  navigateToEdit() {
    this.router.navigate(['/ambulance/edit'], {
      state: { driverData: this.driverData },
    });
  }
}
