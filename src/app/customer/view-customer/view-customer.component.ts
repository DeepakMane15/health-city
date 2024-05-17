import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { CustomerModel } from 'src/app/common/models/CustomerModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss'],
})
export class ViewCustomerComponent implements OnInit {
  public customerData!: CustomerModel;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  userData = new MatTableDataSource<any>();
  columns: Boolean = true;
  defaultTabIndex!: number;

  displayedColumns: string[] = [
    'id',
    'User name',
    'Type',
    // 'Time Zone',
    'Branch',
    'Action',
  ];
  public companyData: any = [
    {
      label: 'Company Name',
      key: 'company_name',
    },
    {
      label: 'Company Id',
      key: 'customer_id',
    },
    {
      label: 'Physical Address',
      key: 'physical_address',
    },
    {
      label: 'Mailing Address',
      key: 'mailing_address',
    },
    {
      label: 'Email Id',
      key: 'company_email',
    },
    {
      label: 'Phone Number',
      key: 'phone',
    },
    {
      label: 'Fax',
      key: 'fax',
    },
    {
      label: 'Website',
      key: 'website',
    },
    {
      label: 'Timezone',
      key: 'timezone',
    },
    {
      label: 'Payment Method',
      key: 'payment_method',
    },
    {
      label: 'Payment Terms',
      key: 'payment_terms',
    },
    {
      label: 'Payment Days',
      key: 'payment_days',
    },
    {
      label: 'Notes',
      key: 'notes',
    },
    {
      label: 'Federal Id/EIN No.',
      key: 'federal_no',
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  ngAfterViewInit() {
    this.userData.paginator = this.paginator;
    this.fetchUsers();
  }

  ngOnInit() {
    this.customerData = history.state.customerData;
    this.defaultTabIndex = (history && history.state.tabIndex) || 0;
    if (!this.customerData) this.router.navigate(['customer']);
    console.log(history.state);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isPageRefresh()) {
          console.log('refreshed');
        }
      }
    });
  }

  isPageRefresh(): boolean {
    return (
      window.performance &&
      window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD
    );
  }

  fetchUsers() {
    let fd = new FormData();
    fd.append('customer_id', String(this.customerData.customer_id));
    this.showSpinner = true;
    this._apiService.post(APIConstant.GET_USERS, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          console.log(res.message);
          this.userData = res.data;
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }
  getMapUrl(address: string | undefined) {
    const url = `https://www.google.com/maps/embed/v1/place?q=${address}&key=${this.apiKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  deleteUser(userId: number) {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('user_id', String(userId));
    this._apiService.post(APIConstant.DELETE_USER, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.fetchUsers();
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }
  navigateToAddUser() {
    this.router.navigate(['customer/add-user'], {
      state: { customerData: this.customerData },
    });
  }
  canDeleteUser(user_type: UserTypeConstant) {
    return user_type !== UserTypeConstant.CUSTOMER;
  }
  navigateBack() {
    this.router.navigate(['customer']);
  }
  navigateToEdit() {
    this.router.navigate(['/customer/edit'], {
      state: { customerData: this.customerData },
    });
  }
  editUser() {
    this.router.navigate(['/customer/user/edit'], {
      state: { userData: this.userData },
    });
  }
}
