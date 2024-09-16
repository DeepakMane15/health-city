import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
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
  selector: 'app-pollution-list',
  templateUrl: './pollution-list.component.html',
  styleUrl: './pollution-list.component.scss'
})
export class PollutionListComponent  {
  displayedColumns: string[] = [
    'id',
    'vehicle',
    'amount',
    'valid',
    'Action',
  ];
  public deleteType = DELETE_TYPE;
  public showSpinner: Boolean = false;
  dataSource = new MatTableDataSource<any>();
  public filteredDataSource!: any[];
  public originalDataSource!: any[];
  public searchTerm!: string;
  public selectedToggle = '1';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private filterService: FilterServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit(){

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchMedicalTeams();
  }

  fetchMedicalTeams() {
    this.showSpinner = true;
    // const fd = new FormData();
    // fd.append('type','9');
    let fd = {type: '9'}
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.dataSource.data = res.data;
          this.originalDataSource = res.data;
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
    this.router.navigate(['/medical-team/pollution/add']);
  }

  handleToggleChange(event: MatButtonToggleChange): void {
    const selectedValue = event.value;
    this.selectedToggle = event.value;
    // Perform any other logic based on the selected value
    if (selectedValue === '1') {
      this.dataSource.data = this.originalDataSource.filter(data => data.type === 'Insurance');
    } else if (selectedValue === '2') {
      this.dataSource.data = this.originalDataSource.filter(data => data.type === 'Pollution');
    }
    this.filteredDataSource = this.dataSource.data.slice();
  }

  applyFilter(): void {
    this.filteredDataSource = this.filterService.applyFilter(
      this.dataSource.data,
      this.searchTerm
    );
  }

  navigateToEdit(medicalData: MedicalTeamModel) {
    this.router.navigate(['/medical-team/pollution/edit'], {
      state: { medicalData: medicalData },
    });
  }
  navigateToView(medicalData: MedicalTeamModel) {
    this.router.navigate(['/medical-team/pollution/view'], {
      state: { pid: medicalData.pid, tabIndex: 0 },
    });
  }

  public openResetPopUp() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'pollution' },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  handleDelete(pid: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { name: 'pollution' },
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

