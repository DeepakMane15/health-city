import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { CustomerModel } from 'src/app/common/models/CustomerModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'Code',
    'Name',
    'Sewa Type',
    'Phone',
    // 'Time Zone',
    // 'Email',
    'Status',
    'Department',
    'Action',
  ];
  public showSpinner: Boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _apiService: ApiService, private router: Router,
    private filterService: FilterServiceService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchCustomers();
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(this.dataSource.data, this.searchTerm);
  }

  fetchCustomers() {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('type', '1');

    this._apiService.post(APIConstant.GET_DRIVERS, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.filteredDataSource = this.dataSource.data.slice();
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  navigateToAdd() {
    this.router.navigate(['/customer/add']);
  }

  navigateToEdit(customerData: CustomerModel) {
    this.router.navigate(['/customer/edit'], {
      state: { customerData: customerData },
    });
  }
  navigateToView(customerData: CustomerModel) {
    this.router.navigate(['/customer/view'], {
      state: { customerData: customerData, tabIndex:0 },
    });
  }
  handleDeleteCustomer(customerId: any) {
    let fd = new FormData();
    fd.append('customer_id', customerId);
    this.showSpinner = true;
    this._apiService.post(APIConstant.DELETE_CUSTOMER, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          console.log(res.message);
          this.fetchCustomers();
        } else {
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        console.log('Delete failed', error);
      }
    );
  }
}
