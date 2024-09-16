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
  public customerData!: any;
  public apiKey = environment.googleMapsApiKey;
  public showSpinner: Boolean = false;
  userData = new MatTableDataSource<any>();
  columns: Boolean = true;
  defaultTabIndex!: number;
  public fuelData!: any;
  public spareData!: any;
  public inOutData!: any;
  public expenseData!: any;

  displayedColumns: string[] = [
    'id',
    'User name',
    'Type',
    // 'Time Zone',
    'Branch',
    'Action',
  ];
  inOutColumns: string[] = ['id', 'vehicle', 'km', 'date','type'];
  expenseColumns: string[] = ['id', 'expense', 'amount','payment', 'date'];

  public companyData: any = [
    {
      label: 'Sewadar Code',
      key: 'sewadar_code',
    },
    {
      label: 'Name',
      key: 'first_name',
    },
    {
      label: 'Type',
      key: 'type',
    },
    {
      label: 'Phone No.',
      key: 'phone',
    },
    {
      label: 'DL NO',
      key: 'dl_no',
    },
    {
      label: 'Department',
      key: 'department',
    },
    {
      label: 'Address',
      key: 'address',
    },
    {
      label: 'Emergency Name',
      key: 'emergency_name',
    },
    {
      label: 'Emergency No',
      key: 'emergency_no',
    },
    {
      label: 'Insurance',
      key: 'insurance',
    },
    {
      label: 'Payment Method',
      key: 'payment_method',
    },
    {
      label: 'Fuel Card Issued',
      key: 'fuel_card_issued',
    },
    {
      label: 'Fuel Card No.',
      key: 'fuel_card_no',
    },
    {
      label: 'Fuel Card Make',
      key: 'fuel_card_make',
    },
    {
      label: 'Cash Eligiblity',
      key: 'cash_eligiblity',
    },
    {
      label: 'Cash Limit',
      key: 'cash_limit',
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
    // this.expenseData.paginator = this.paginator;
    // this.fetchExpense();
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
    this.getFuelData();
    this.fetchExpense();

  }

  public getFuelData() {
    this.showSpinner = true;
    // const formData = new FormData();
    // formData.append('type', '8');
    // formData.append('driver', this.customerData['id']);
    // formData.append('isVehicle', '0');
    let formData = {type: '8', driver: this.customerData['id'], isVehicle: '0'}

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

  fetchExpense() {
    // let fd = new FormData();
    // fd.append('type', '4');
    // fd.append('driver_id', this.customerData.id.toString());
    let fd = {type: '4', driver_id: this.customerData.id.toString()};
    this.showSpinner = true;
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          console.log(res.message);
          this.expenseData = res.data;
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
