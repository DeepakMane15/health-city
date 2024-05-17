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

  displayedColumns: string[] = [
    'id',
    'User name',
    'Type',
    // 'Time Zone',
    'Branch',
    'Action',
  ];
  public medicalProfile: any = [
    {
      label: 'Name',
      key: 'full_name',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Phone No',
      key: 'phone_no',
    },
    {
      label: 'Describe',
      key: 'discibe',
    },
    {
      label: 'Profession',
      key: 'profession_name',
    },
    {
      label: 'Languages',
      key: 'language_names',
    },
    {
      label: 'Ethnicity',
      key: 'ethnicity_name',
    },
    {
      label: 'Service Area',
      key: 'service_area_names',
    },
    {
      label: 'County',
      key: 'country_names',
    },
    {
      label: 'Address',
      key: 'address',
    },
    {
      label: 'Internal Notes',
      key: 'internal_notes',
    },
  ];

  public medicalDocuments: any = [
    {
      label: 'Resume',
      key: 'resume',
    },
    {
      label: 'Licence',
      key: 'licence',
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
    let pid = history.state.pid;
    if (pid) this.fetchMedicalTeamData(pid);
    this.defaultTabIndex = (history && history.state.tabIndex) || 0;
    // if (!pid) this.router.navigate(['medical-team']);
    console.log(history.state);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isPageRefresh()) {
          console.log('refreshed');
        }
      }
    });
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
