import { DatePipe } from '@angular/common';
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
  providers: [DatePipe]
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
    sewadar_code: ['SD00000', Validators.required],
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
    fuel_card_make: '',
    fNo: '',
    cashElg: '',
    cLimit: '',
  });

  public categorySettings!: IDropdownSettings;
  public subCategorySettings!: IDropdownSettings;
  isFocused: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private _googleService: GoogleService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.companyForm.get('iDate')?.disable();
    this.companyForm.get('fNo')?.disable();
    this.companyForm.get('cLimit')?.disable();
    this.companyForm.get('fuel_card_make')?.disable();


    this.customerData = history.state.customerData;

    this.companyForm.patchValue({
      id:  this.customerData['id'],
      sewadar_code:  this.customerData['sewadar_code'],
      sewadar_type:  this.customerData['sewadar_type'],
      fname: this.customerData['first_name'],
      lname: this.customerData['last_name'],
      dl: this.customerData['dl_no'],
      phone: this.customerData['phone'],
      department: this.customerData['department'],
      address: this.customerData['address'],
      eNo: this.customerData['emergency_no'],
      eName: this.customerData['emergency_name'],
      // insurance: this.customerData['insurance'],
      iDate: this.customerData['insurance_date'],
      // fuel_card: this.customerData['fuel_card_issued'],
      fuel_card_make: this.customerData['fuel_card_make'],
      fNo: this.customerData['fuel_card_no'],
      // cashElg: this.customerData['cash_eligiblity'],
      cLimit: this.customerData['cash_limit'],
    });
    if(this.customerData['insurance'] === "1") {
      this.companyForm.get('iDate')?.enable();
    }
    if(this.customerData['fuel_card_issued'] === "1") {
      this.companyForm.get('fNo')?.enable();
      this.companyForm.get('fuel_card_make')?.enable();
    }
    if(this.customerData['cash_eligiblity'] === "1") {
      this.companyForm.get('cLimit')?.enable();
    }
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
    if (isCheck) {
      this.companyForm.get('fNo')?.enable();
      this.companyForm.get('fuel_card_make')?.enable();
    } else {
      this.companyForm.get('fNo')?.disable();
      this.companyForm.get('fuel_card_make')?.disable();
    }
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
      const formModel: any = this.companyForm.value;
      formData.append("type", "2");
      for (const key of Object.keys(formModel)) {
        if(key === 'iDate') {
          let date = this.datePipe.transform(this.companyForm.get('iDate')?.value, 'MM-dd-yyyy');
          formData.append(key, date?.toString() || "");
        }
        else {
          const value = formModel[key];
          formData.append(key, value);
        }
      }

      this._apiService
        .post(
          this.customerData
            ? APIConstant.SNM_EDIT
            : APIConstant.SNM_SAVE,
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
