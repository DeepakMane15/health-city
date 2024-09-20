import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { CustomerModel } from 'src/app/common/models/CustomerModel';
import { DeleteConfirmComponent } from 'src/app/shared/dialog/delete-confirm/delete-confirm.component';
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
    'Status',
    'Name',
    'Code',
    'Sewa Type',
    'Phone',
    // 'Time Zone',
    // 'Email',
    // 'Department',
    'Action',
  ];
  public showSpinner: Boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;
  public selectedType: string = '0';

  public status = [
    {key: '0',value:'All'}, {key: 'In', value: 'Free'}, {key:'Out', value: 'Occupied'}
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _apiService: ApiService, private router: Router,
    private dialog: MatDialog,
    private filterService: FilterServiceService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchCustomers();
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(this.dataSource.data, this.searchTerm);
  }

  changedType() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.showSpinner = true;
    // const fd = new FormData();
    // fd.append('type', '1');
    let fd = {type: '1', selectedType: this.selectedType};

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
    this.router.navigate(['/driver/add']);
  }

  navigateToEdit(customerData: CustomerModel) {
    this.router.navigate(['/driver/edit'], {
      state: { customerData: customerData },
    });
  }
  navigateToView(customerData: CustomerModel) {
    this.router.navigate(['/driver/view'], {
      state: { customerData: customerData, tabIndex:0 },
    });
  }
  handleDeleteCustomer(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Patient' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // let fd = new FormData();
        // fd.append('type', DELETE_TYPE.PATIENT.toString());
        // fd.append('id', patientId);
        let fd = {
          type: '1',
          id: id
        }
        this.showSpinner = true;
        this._apiService.post(APIConstant.COMMON_DELETE, fd).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
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
    });
  }

  getCount(type: number) :number {
    return this.dataSource.data.filter(data => data.status === (type === 1 ?'In' : 'Out'))?.length || 0;
  }
}
