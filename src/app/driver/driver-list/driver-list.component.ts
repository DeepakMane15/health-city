import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import {
  AssignmentStatus,
  DELETE_TYPE,
} from 'src/app/common/constants/AppEnum';
import { DeleteConfirmComponent } from 'src/app/shared/dialog/delete-confirm/delete-confirm.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss',
})
export class DriverListComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'status',
    'name',
    'phone',
    'date',
    'time',
    'pickup',
    'destination',
    'action',
  ];

  showSpinner: any;
  public showSpinnner: Boolean = false;
  public originalData: any = [];
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public selectedType:string = '0';
  public status = [
    {key: '0',value:'All'}, {key: 'pending', value: 'Pending'}, {key:'complete', value: 'Completed'},
    {key:'cancelled', value: 'Cancelled'}
  ];

  constructor(
    private _apiServices: ApiService,
    private filterService: FilterServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchDrivers();
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(
      this.dataSource.data,
      this.searchTerm
    );
  }

  changedType () {
    if(this.selectedType === 'cancelled') {
    let index = this.displayedColumns.findIndex(d => d=== 'action');
    if(index > -1){
      this.displayedColumns.splice(index,1);
    }
  } else {
    let index = this.displayedColumns.findIndex(d => d=== 'action');
    if(index < 0) {
      this.displayedColumns.push('action');
    }
  }

    this.fetchDrivers();
  }
  fetchDrivers() {
    this.showSpinner = true;
    // const fd = new FormData();
    // fd.append('type', '6');
    let fd = {type: '6', selectedType: this.selectedType};
    this._apiServices.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.originalData = res.data;
          this.filteredDataSource = this.dataSource.data.slice();
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  approveRequest(id: string) {
    this.showSpinner = true;
    // const fd = new FormData();
    // fd.append('type','9');
    // fd.append('id',id);

    let fd = { type: '9', id: id };

    this._apiServices.post(APIConstant.SNM_EDIT, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.fetchDrivers();
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  navigateToAdd() {
    this.router.navigate(['/pre-request/add']);
  }

  navigateToEdit(driverData: any) {
    this.router.navigate(['/pre-request/edit'], {
      state: { patientData: driverData },
    });
  }
  navigateToView(driverData: any) {
    this.router.navigate(['/pre-request/view'], {
      state: { driverId: driverData.id, tabIndex: 0 },
    });
  }

  handleDelete(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Pre Request' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // let fd = new FormData();
        // fd.append('id', id);
        // fd.append('type', DELETE_TYPE.DRIVER.toString());
        let fd = {
          id: id,
          type: '6'
        }
        this.showSpinner = true;
        this._apiServices.post(APIConstant.COMMON_DELETE, fd).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.fetchDrivers();
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

  public refineLongText(value: string): string {
    let values = value?.split(',');

    if (values?.length > 2) return values?.splice(0, 2)?.join(',');
    return value;
  }
}
