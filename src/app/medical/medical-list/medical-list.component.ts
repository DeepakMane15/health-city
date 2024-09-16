import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { DELETE_TYPE } from 'src/app/common/constants/AppEnum';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { DeleteConfirmComponent } from 'src/app/shared/dialog/delete-confirm/delete-confirm.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FilterServiceService } from 'src/app/shared/services/filter-service/filter-service.service';

@Component({
  selector: 'app-medical-list',
  templateUrl: './medical-list.component.html',
  styleUrls: ['./medical-list.component.scss'],
})
export class MedicalListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Registration',
    'Make',
    'Model',
    'Color',
    'Type',
    'Reading',
    'Chasis',
    // 'Ethnicity',
    // 'Address',
    'Action',
  ];
  public deleteType = DELETE_TYPE;
  public showSpinner: Boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public searchTerm!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public outCount: number = 0;
  public inCount: number = 0;
  public originalData!: any;
  constructor(
    private _apiService: ApiService,
    private router: Router,
    private filterService: FilterServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchMedicalTeams();
  }

  fetchMedicalTeams() {
    this.showSpinner = true;
    // const fd = new FormData();
    // fd.append('type','2');
    let fd = {type: '2'}
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.originalData = res.data;
          this.inCount = res.data.filter((data: any) => data.status === 'In')?.length;
          this.outCount = res.data.filter((data: any) => data.status === 'Out')?.length;

          this.dataSource.data = this.originalData.slice();
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  navigateToAdd() {
    this.router.navigate(['/medical-team/add']);
  }

  applyFilter(): void {
    this.dataSource.data = this.filterService.applyFilter(
      this.originalData,
      this.searchTerm
    );
  }

  navigateToEdit(medicalData: MedicalTeamModel) {
    this.router.navigate(['/medical-team/edit'], {
      state: { medicalData: medicalData },
    });
  }
  navigateToView(medicalData: MedicalTeamModel) {
    this.router.navigate(['/medical-team/view'], {
      state: { pid: medicalData, tabIndex: 0 },
    });
  }

  public openResetPopUp() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Medical-Team' },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  handleDelete(pid: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'Medical-Team' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let fd = new FormData();
        fd.append('type', DELETE_TYPE.MEDICAL.toString());
        fd.append('pid', pid);
        this.showSpinner = true;
        this._apiService.post(APIConstant.COMMON_DELETE, fd).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.fetchMedicalTeams();
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

  public approveMedicalTeam(pid: number) {
    const fd = new FormData();
    fd.append('pid', pid.toString());
    this.showSpinner = true;
    this._apiService.post(APIConstant.APPROVE_MEDICALTEAM, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.fetchMedicalTeams();
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
}
