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
// import { AssignmentModel } from 'src/app/common/models/AssignmentModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';
import { AddInOutComponent } from '../add-in-out/add-in-out.component';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.scss',
})
export class AssignmentListComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'vehicle',
    'type',
    'driver',
    'date',
    // 'time',
    'km',
    'action',
  ];

  showSpinner: any;
  public assignmentStatus = AssignmentStatus;
  public statusFilter: string = 'all';
  public showSpinnner: Boolean = false;
  public originalData: any = [];
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _apiServices: ApiService,
    private router: Router,
    private filterService: FilterServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchAssignments();
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(
      this.dataSource.data,
      this.searchTerm
    );
  }

  fetchAssignments() {
    this.showSpinner = true;
    // const fd = new FormData();
    // fd.append('type', '5');
    let fd = {type: '5'}
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
  navigateToAdd() {
    this.router.navigate(['/assignments/add']);
  }

  navigateToEdit(assignmentData: any) {
    this.router.navigate(['/assignments/edit'], {
      state: { assignmentData: assignmentData },
    });
  }
  navigateToView(assignmentData: any) {
    this.router.navigate(['/assignments/view'], {
      state: { assignmentId: assignmentData.id, tabIndex: 0 },
    });
  }
  handleDeleteAssignment(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      height: '550px',
      data: { name: 'Assignment' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let fd = new FormData();
        fd.append('id', id);
        fd.append('type', DELETE_TYPE.ASSIGNMENT.toString());
        this.showSpinner = true;
        this._apiServices.post(APIConstant.COMMON_DELETE, fd).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.fetchAssignments();
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
  public filterByStatus() {
    this.showSpinner = true;
    if (this.statusFilter === 'all') {
      this.dataSource.data = this.originalData;
      this.showSpinner = false;
      return;
    }
    let filteredData = this.originalData.filter(
      (data: any) => data.status === this.statusFilter
    );
    this.dataSource.data = filteredData;
    this.showSpinner = false;
  }

  public refineLongText(value: string): string {
    let values = value?.split(',');

    if (values?.length > 2) return values?.splice(0, 2)?.join(',');
    return value;
  }

  public openInOut(data = null) {
    const dialogRef = this.dialog.open(AddInOutComponent, {
      width: '400px',
      height: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.fetchAssignments();
    });
  }
}
