import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/common/constants/AppConstants';

@Component({
  selector: 'app-view-medical',
  templateUrl: './view-medical.component.html',
  styleUrls: ['./view-medical.component.scss'],
})
export class ViewMedicalComponent implements OnInit {
  public medicalData!: MedicalTeamModel;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  columns: Boolean = true;
  defaultTabIndex!: number;
  public appConstants = AppConstants;
  public fuelData!: any;
  public spareData!: any;
  public inOutData!: any;

  displayedColumns: string[] = [
    'id',
    'receipt',
    'fuel',
    'rate',
    'amount',
    'transaction',
  ];
  spareColumns: string[] = ['id', 'part', 'desc','date'];
  inOutColumns: string[] = ['id', 'driver', 'km', 'date','type'];

  public medicalProfile: any = [
    {
      label: 'Registration No',
      key: 'registeration_no',
    },
    {
      label: 'Chasis No',
      key: 'chassis_no',
    },
    {
      label: 'Engine No',
      key: 'engine_no',
    },
    {
      label: 'Manufacturing Date',
      key: 'manufacturing_date',
    },
    {
      label: 'Sitting Capacity',
      key: 'sitting_capacity',
    },
    {
      label: 'Vehicle Class',
      key: 'vehicle_class',
    },
    {
      label: 'Model Name',
      key: 'model_name',
    },
    {
      label: 'Vehicle Make',
      key: 'vehicle_make',
    },
    {
      label: 'Purchase Date',
      key: 'purchase_date',
    },
    {
      label: 'Registration Date',
      key: 'registeration_date',
    },
    {
      label: 'Fuel Type',
      key: 'fuel_type',
    },
    {
      label: 'Color',
      key: 'color',
    },
    {
      label: 'Available',
      key: 'available',
    },
    {
      label: 'Registration Validity',
      key: 'registeration_validity',
    },
    {
      label: 'Remark',
      key: 'remark',
    },
    {
      label: 'Present KM',
      key: 'present_km',
    },
  ];

  public medicalDocuments: any = [
    {
      label: 'Registration Certificate',
      key: 'resume',
    },
    {
      label: 'Pollution Certificate',
      key: 'licence',
    },
    {
      label: 'Insurance',
      key: 'insurance',
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
    this.medicalData = history.state.pid;
    // if (pid) this.fetchMedicalTeamData(pid);
    this.defaultTabIndex = (history && history.state.tabIndex) || 0;
    // if (!pid) this.router.navigate(['medical-team']);
    // console.log(history.state);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isPageRefresh()) {
          console.log('refreshed');
        }
      }
    });
    this.getFuelData();
  }
  public getFuelData() {
    this.showSpinner = true;
    const formData = new FormData();
    formData.append('type', '8');
    formData.append('vehicle', this.medicalData['id']);
    this._apiService.post(APIConstant.SNM_GET_BY_ID, formData).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.fuelData = res.data['fuel'];
          this.spareData = res.data['spare-parts'];
          this.inOutData = res.data['inout'];
        } else {
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Operation failed', error);
      }
    );
  }

  private fetchMedicalTeamData(pid: string) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('prof_id', pid);
    this._apiService.post(APIConstant.GET_MEDICALTEAM_BY_ID, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          console.log(res.message);
          this.medicalData = res.data;
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

  getMapUrl(address: string | undefined) {
    const url = `https://www.google.com/maps/embed/v1/place?q=${address}&key=${this.apiKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateToAddUser() {
    this.router.navigate(['customer/add-user'], {
      state: { medicalData: this.medicalData },
    });
  }
  navigateBack() {
    this.router.navigate(['medical-team']);
  }

  navigateToEdit() {
    this.router.navigate(['/medical-team/edit'], {
      state: { medicalData: this.medicalData },
    });
  }
}
