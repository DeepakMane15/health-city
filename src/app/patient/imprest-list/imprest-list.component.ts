import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { DELETE_TYPE } from 'src/app/common/constants/AppEnum';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { DeleteConfirmComponent } from 'src/app/shared/dialog/delete-confirm/delete-confirm.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';

@Component({
  selector: 'app-imprest-list',
  templateUrl: './imprest-list.component.html',
  styleUrl: './imprest-list.component.scss'
})
export class ImprestListComponent {
  displayedColumns: string[] = ['id', 'cash', 'reason', 'amount','Action'];

  public showSpinner: Boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _apiService: ApiService,
    private filterService: FilterServiceService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchPatients();
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(
      this.dataSource.data,
      this.searchTerm
    );
  }

  fetchPatients() {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append('type', '4');
    this._apiService.post(APIConstant.SNM_GET,fd).subscribe(
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
    this.router.navigate(['/patients/add']);
  }

  navigateToEdit(patientData: PatientModel) {
    this.router.navigate(['/patients/edit'], {
      state: { patientData: patientData },
    });
  }
  navigateToView(patientData: PatientModel) {
    this.router.navigate(['/patients/view'], {
      state: { id: patientData.id, tabIndex: 0 },
    });
  }
  handleDeletePatient(patientId: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Patient' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let fd = new FormData();
        fd.append('type', DELETE_TYPE.PATIENT.toString());
        fd.append('id', patientId);
        this.showSpinner = true;
        this._apiService.post(APIConstant.COMMON_DELETE, fd).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.fetchPatients();
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
