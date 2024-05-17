import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { CustomerModel } from 'src/app/common/models/CustomerModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GoogleService } from 'src/app/shared/services/google/google.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public customerData!: CustomerModel;
  public category!: any;
  public subCategory!: any;
  public filteredSubCat!: any;
  public selCat!: any;
  public isIns: boolean = false;
  public isFuel: boolean = false;
  public isCash: boolean = false;

  companyForm = this.fb.group({
    id: 0,
    sewadar_code: ['', Validators.required],
    sewadar_type: ['', Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    dl: ['', Validators.required],
    phone: ['', Validators.required],
    department: ['', Validators.required],
    address: ['', Validators.required],
    eNo: ['', Validators.required],
    eName: ['', Validators.required],
    insurance: '',
    iDate: '',
    fuel_card: '',
    fNo: '',
    cashElg: '',
    cLimit: '',
  });

  public categorySettings!: IDropdownSettings;
  public subCategorySettings!: IDropdownSettings;

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private _googleService: GoogleService
  ) {}

  ngOnInit(): void {
    this.companyForm.get('iDate')?.disable();
    this.companyForm.get('fNo')?.disable();
    this.companyForm.get('cLimit')?.disable();

    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.subCategorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.customerData = history.state.customerData;
    console.log(this.customerData);
    this.companyForm.patchValue({});
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  handleIns(isCheck: boolean) {
    this.isIns = isCheck;
    if (isCheck) this.companyForm.get('iDate')?.enable();
    else this.companyForm.get('iDate')?.disable();
  }

  handleFuel(isCheck: boolean) {
    this.isFuel = isCheck;
    if (isCheck) this.companyForm.get('fNo')?.enable();
    else this.companyForm.get('fNo')?.disable();
  }

  handleCash(isCheck: boolean) {
    this.isCash = isCheck;
    if (isCheck) this.companyForm.get('cLimit')?.enable();
    else this.companyForm.get('cLimit')?.disable();
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.showSpinner = true;
      const formData = new FormData();
      this._apiService
        .post(
          this.customerData
            ? APIConstant.EDIT_CUSTOMER
            : APIConstant.ADD_CUSTOMER,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/customer']);
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

  public handleCancel() {
    this.router.navigate(['customer'], {
      state: { customerData: this.customerData },
    });
  }
  public navigateBack() {
    this.router.navigate(['/customer']);
  }
}
