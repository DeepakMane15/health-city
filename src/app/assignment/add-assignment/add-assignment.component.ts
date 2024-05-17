import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ADD_POPUP_COMPONENT } from 'src/app/common/constants/AppEnum';
import { AssignmentModel } from 'src/app/common/models/AssignmentModel';
import { AssignmentTypeModel } from 'src/app/common/models/AssignmentTypeModel';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { AddFormPopupComponent } from 'src/app/shared/dialog/add-form-popup/add-form-popup.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.scss',
})
export class AddAssignmentComponent implements OnInit {
  public showSpinner: Boolean = false;
  public assignmentData: any;
  public isUnameAvailable: Boolean = true;
  public panelOpenState = false;
  public medicalTeams: MedicalTeamModel[] = [];
  public patientsMaster: PatientModel[] = [];
  public assignmentsMaster: AssignmentTypeModel[] = [];

  assignmentForm = this.fb.group({
    customer_id: 0,
    assignment_id: 0,
    medicalId: [[], Validators.required],
    medicalProfession: [''],
    assignment: [[], Validators.required],
    transaction: [''],
    date: ['', Validators.required],
    amount: ['', Validators.required],
    paymentDate: [''],
    patientId: [[], Validators.required],
    patientAddress: [''],
    cPerson1Name: [''],
    cPerson1Phone: [''],
    cPerson2Name: [''],
    cPerson2Phone: [''],
    visitDate: ['', Validators.required],
    visitTime: ['', Validators.required],
    prNotes: [''],
    pNotes: [''],
    iNotes: [''],
  });
  public medSettings!: IDropdownSettings;
  public assSettings!: IDropdownSettings;
  public patSettings!: IDropdownSettings;

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.medSettings = {
      singleSelection: true,
      idField: 'pid',
      textField: 'first_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.patSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.assSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.assignmentData = history.state.assignmentData;
    console.log(this.assignmentData);
    if (this.assignmentData) {
      console.log(this.assignmentData);
      this.assignmentForm.patchValue({
        customer_id: this.assignmentData.company_id,
        assignment_id: this.assignmentData.id,
        // medicalId: this.assignmentData.medical_team,
        medicalProfession: this.assignmentData.profession,
        // assignment: this.assignmentData.assignment,
        transaction: this.assignmentData.transaction,
        date: this.assignmentData.date,
        amount: this.assignmentData.amount,
        paymentDate: this.assignmentData.paymentdate,
        // patientId: this.assignmentData.patient,
        patientAddress: this.assignmentData.name,
        cPerson1Name: this.assignmentData.cperson1,
        cPerson1Phone: this.assignmentData.cphone1,
        cPerson2Name: this.assignmentData.cperson2,
        cPerson2Phone: this.assignmentData.cphone2,
        visitDate: this.assignmentData.fromdate,
        visitTime: this.assignmentData.time,
        prNotes: this.assignmentData.ptnotes,
        pNotes: this.assignmentData.pnotes,
        iNotes: this.assignmentData.inotes,
      });
    }
    this.fetchMedicalTeams();
    this.fetchInitialData();
  }
  onItemSelect(item: any) {
    this.handleMedicalSelect(item);
  }
  onSelectAll(items: any) {}
  public fetchInitialData() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_ASSIGNMENT_INITIAL_DATA).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.assignmentsMaster = res.data.assignment;
          this.patientsMaster = res.data.patients;

          if (this.patientsMaster && this.assignmentData) {
            this.assignmentForm.patchValue({
              patientId: res.data.patients.filter(
                (item: any) => this.assignmentData.patient === item.id
              ),
              assignment: res.data.assignment.filter(
                (item: any) => this.assignmentData.assignment === item.id
              ),
            });

            let patientSelected = this.patientsMaster.find(
              (p) => p.id === this.assignmentData.patient
            );

            if (patientSelected) {
              this.assignmentForm.patchValue({
                patientAddress: patientSelected.address,
              });
            }
          }
        } else {
          console.error('Initial Data fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Initial Data fetch failed', error);
      }
    );
  }

  public fetchMedicalTeams() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICALTEAMS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.medicalTeams = res.data;
          if (this.assignmentData) {
            this.assignmentForm.patchValue({
              medicalId: res.data.filter(
                (item: any) => this.assignmentData.medical_team === item.pid
              ),
            });
          }
        } else {
          console.error('Medical teams fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Medical teams fetch failed', error);
      }
    );
  }

  public handleMedicalSelect(item: any) {
    let medical = this.medicalTeams.find((medical) => medical.pid === item.pid);

    if (medical) {
      this.assignmentForm.patchValue({
        medicalProfession: medical.profession_name,
      });
    }
  }
  public navigateBack() {
    this.router.navigate(['/assignments']);
  }

  onSubmit(): void {
    if (this.assignmentForm.valid) {
      const formModel: AssignmentModel = this.assignmentForm
        .value as AssignmentModel;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        if (
          key !== 'medicalId' &&
          key !== 'assignment' &&
          key !== 'patientId'
        ) {
          const value = formModel[key];
          formData.append(key, value);
        }
      }
      formData.append(
        'medicalId',
        (this.assignmentForm.get('medicalId')?.value || [])
          .map((item: any) => item.pid)
          .join(',')
      );
      formData.append(
        'patientId',
        (this.assignmentForm.get('patientId')?.value || [])
          .map((item: any) => item.id)
          .join(',')
      );
      formData.append(
        'assignment',
        (this.assignmentForm.get('assignment')?.value || [])
          .map((item: any) => item.id)
          .join(',')
      );
      this.showSpinner = true;
      this._apiService
        .post(
          this.assignmentData
            ? APIConstant.EDIT_ASSIGNMENT
            : APIConstant.ADD_ASSIGNMENT,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/assignments']);
            } else {
              this.showSpinner = false;
              console.log(res.message);
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Operation failed', error);
          }
        );
    }
    return;
  }

  public handlePatientSelect(item: any) {
    let patient = this.patientsMaster.find((pat) => pat.id === item.id);

    if (patient) {
      this.assignmentForm.patchValue({
        patientAddress: patient.address,
        cPerson1Name: patient.contactPerson1_name,
        cPerson1Phone: patient.contactPerson1_phone,
        cPerson2Name: patient.contactPerson2_name,
        cPerson2Phone: patient.contactPerson2_phone,
      });
    }
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  public openAddPopUpForm() {
    const dialogRef = this.dialog.open(AddFormPopupComponent, {
      width: '900px',
      height: '550px',
      data: {
        component: ADD_POPUP_COMPONENT.PATIENT,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchInitialData();
    });
  }
}
