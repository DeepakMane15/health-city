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
  selector: 'app-view-ambulance',
  templateUrl: './view-ambulance.component.html',
  styleUrl: './view-ambulance.component.scss',
})
export class ViewAmbulanceComponent implements OnInit {
  public ambulanceData!: any;
  public driverData!: any;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  columns: Boolean = true;
  defaultTabIndex!: number;
  public appConstants = AppConstants;
  public address!: string;

  public ambulanceProfile: any = [
    {
      label: 'Assignment',
      key: 'assignment_name',
    },
    {
      label: 'Patient',
      key: 'patient_name',
    },
    {
      label: 'Date',
      key: 'date',
    },
    {
      label: 'Amount',
      key: 'amount',
    },
    {
      label: 'Payment Date',
      key: 'paymentDate',
    },
    {
      label: 'Pick Up Address',
      key: 'pickupAddress',
    },
    {
      label: 'Pick Up Date-Time',
      key: 'pickupDate',
    },
    {
      label: 'Pick Up PO',
      key: 'pickupPO',
    },
    {
      label: 'Pick Up PU',
      key: 'pickupPU',
    },
    {
      label: 'Destination Address',
      key: 'destAddress',
    },
    {
      label: 'Destination Date-Time',
      key: 'destDate',
    },
    {
      label: 'Destination PO',
      key: 'destPO',
    },
    {
      label: 'Destination PU',
      key: 'destPU',
    },
  ];
  public equipmentProfile: any = [
  {
    label: 'Equipment Model',
    key: 'vehicleModel',
  },
  {
    label: 'Registration No',
    key: 'registrationNo',
  },
];
  public driverProfile: any = [
    {
      label : 'First name',
      key : 'first_name',
    },
    {
      label : 'Last name',
      key : 'last_name',
    },
    {
      label : 'Email',
      key : 'email',
    },
    {
      label : 'Mobile no.',
      key : 'mobile_no',
    },
    {
      label : 'Driving License',
      key : 'dl',
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
    let ambulanceId = history.state.ambulanceId;
    if (ambulanceId) this.fetchAmbulanceData(ambulanceId);
    this.defaultTabIndex = (history && history.state.tabIndex) || 0;
    if (!ambulanceId) this.router.navigate(['ambulance']);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isPageRefresh()) {
        }
      }
    });
  }

  private fetchAmbulanceData(ambulanceId: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('ambulance_id', ambulanceId);
    this._apiService.post(APIConstant.GET_MEDTRANS_BY_ID, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          // console.log(res.data);
          this.fetchDriverData(res.data.driver);
          this.ambulanceData = res.data;
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
    this.router.navigate(['ambulance']);
  }

  navigateToEdit() {
    this.router.navigate(['/ambulance/edit'], {
      state: { ambulanceData: this.ambulanceData },
    });
  }
}
