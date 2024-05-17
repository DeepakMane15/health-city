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
  companyForm = this.fb.group({
    customer_id: 0,
    username: [
      '',
      [
        Validators.required,
        Validators.email,
        this.usernameAvailabilityValidator.bind(this),
      ],
    ],
    password: ['', Validators.required],
    category: [this.selCat, Validators.required],
    sub_category: [this.selCat, Validators.required],
    company_name: ['', Validators.required],
    federal_no: [
      '',
      [
        Validators.required,
        // Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ],
    ],
    physical_address: ['', Validators.required],
    mailing_address: ['', Validators.required],
    company_email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'), // Valid pattern: (XXX) XXX-XXXX
      ],
    ],
    fax: [
      '',
      [
        Validators.required,
        Validators.pattern('^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'), // Valid pattern: (XXX) XXX-XXXX
      ],
    ],
    website: '',
    timezone: ['', Validators.required],
    contact_name: ['', Validators.required],
    position: '',
    contact_phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$'), // Valid pattern: (XXX) XXX-XXXX
      ],
    ],
    contact_email: ['', [Validators.required, Validators.email]],
    credit_limit: '',
    payment_method: '',
    payment_days: '',
    payment_terms: '',
    notes: '',
    company_id: ['', Validators.required],
    status: [true, Validators.required],
    user_type: UserTypeConstant.CUSTOMER,
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

    this.getCategories();
    this.getTimeZones();
    this.customerData = history.state.customerData;
    console.log(this.customerData);
    this.companyForm.patchValue({
      customer_id: this.customerData.customer_id,
      username: this.customerData.username,
      password: this.customerData.password,
      // category: this.customerData.category?.split(','),
      // sub_category: this.customerData['sub_category']?.split(','),
      company_name: this.customerData.company_name,
      physical_address: this.customerData.physical_address,
      mailing_address: this.customerData.mailing_address,
      fax: this.customerData.fax,
      timezone: this.customerData.timezone,
      federal_no: this.customerData.federal_no,
      company_email: this.customerData.company_email,
      phone: this.customerData.phone,
      contact_name: this.customerData.contact_name,
      position: this.customerData.position,
      contact_phone: this.customerData.contact_phone,
      contact_email: this.customerData.contact_email,
      credit_limit: this.customerData.credit_limit,
      payment_method: this.customerData.payment_method,
      payment_days: this.customerData.payment_days,
      payment_terms: this.customerData.payment_terms,
      notes: this.customerData.notes,
    });
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.companyForm.patchValue({
        category:
          (this.companyForm.value.category
            ? this.companyForm.value.category
            : []
          ).map((option: any) => option.id) || [],
        sub_category:
          (this.companyForm.value.sub_category
            ? this.companyForm.value.sub_category
            : []
          ).map((option: any) => option.id) || [],
      });
      const formModel: any = this.companyForm.value;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        // if(key !== 'category' && key !== 'sub_category')
        formData.append(key, value);
      }

      this.showSpinner = true;
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

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  public handleCatChange(item: any) {
    // console.log(event.value)
    let allids = Array.from(
      new Set(
        (this.companyForm.get('category')?.value || []).map(
          (item: any) => item.id
        )
      )
    );
    this.filteredSubCat = this.subCategory.filter((cat: any) =>
      allids.includes(cat.category_id)
    );

  }

  public async checkUsernameAvailable(event: Event) {
    if (!this.companyForm.get('username')?.hasError('email')) {
      const inputElement = event.target as HTMLInputElement;
      let username = inputElement.value;
      try {
        this.isChecking = true;
        console.log(this.isChecking);
        const isAvailable: boolean =
          await this._authService.checkUsernameAvailable(username);
        this.isUnameAvailable = isAvailable;
        this.companyForm.get('username')?.updateValueAndValidity();
      } catch (err) {
        console.log(err);
      } finally {
        this.isChecking = false;
        console.log(this.isChecking);
      }
    }
  }

  public getAddressPredictions(event: Event) {
    return;
    if (event) {
      const inputElement = event.target as HTMLInputElement;
      let company = inputElement.value;
      this._googleService
        .getAddressPredictions(company)
        .subscribe((predictions: any) => {
          this.addressPredictions = predictions?.predictions || [];
          console.log(this.addressPredictions);
        });
    }
  }

  public handleFederalNo(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let enteredValue = inputElement.value;

    enteredValue = enteredValue.replace(/\D/g, '');

    if (enteredValue.length > 3) {
      enteredValue = enteredValue.slice(0, 3) + '-' + enteredValue.slice(3);
    }

    enteredValue = enteredValue.slice(0, 10);

    this.companyForm.patchValue(
      { federal_no: enteredValue },
      { emitEvent: false }
    );
    this.companyForm.get('federal_no')?.markAsTouched(); // Mark federal_no as touched

    if (enteredValue.length < 10) {
      this.companyForm.get('federal_no')?.setErrors({ maxlength: true });
    } else {
      this.companyForm.get('federal_no')?.setErrors(null); // Clear the 'maxlength' error
    }
  }

  handleMobileNumber(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    let enteredValue = inputElement.value;

    enteredValue = enteredValue.replace(/\D/g, ''); // Allow only numbers
    enteredValue = enteredValue.slice(0, 10); // Limit to 10 characters

    // Format the phone number as (XXX) XXX-XXXX
    if (enteredValue.length > 3) {
      enteredValue = `(${enteredValue.slice(0, 3)}) ${enteredValue.slice(3)}`;
    }
    if (enteredValue.length > 9) {
      enteredValue = `${enteredValue.slice(0, 9)}-${enteredValue.slice(9)}`;
    }

    // Update form control value and validate
    if (field === 'phone')
      this.companyForm.patchValue(
        { phone: enteredValue },
        { emitEvent: false }
      );
    else if (field === 'fax')
      this.companyForm.patchValue({ fax: enteredValue }, { emitEvent: false });
    else if (field === 'contact_phone')
      this.companyForm.patchValue(
        { contact_phone: enteredValue },
        { emitEvent: false }
      );

    this.companyForm.get(field)?.markAsTouched(); // Mark phone as touched
  }

  public handlePasswordCreation(event: MatRadioChange) {
    if (event.value == 1) {
      this.companyForm.patchValue({ password: '' });
    } else {
      this.companyForm.patchValue({ password: this.generateRandomPassword() });
    }
  }

  public generateRandomPassword() {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&';

    let password = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  public handleMailingAddress(event: MatCheckboxChange) {
    if (event.checked) {
      this.companyForm.patchValue({
        mailing_address: this.companyForm.get('physical_address')?.value,
      });
    } else {
      this.companyForm.patchValue({ mailing_address: '' });
    }
  }

  public getTimeZones() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_TIMEZONE).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.timezones = res.data;
        } else {
          console.error('Timexone fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Timexone fetch failed', error);
      }
    );
  }
  public getCategories() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_CATEGORY).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.category = res.data.category;
          this.subCategory = res.data['sub-category'];
          // this.filteredSubCat = res.data['sub-category'];
          if (this.customerData) {
            this.companyForm.patchValue({
              category: res.data.category.filter((item: any) =>
                this.customerData.category.split(',').includes(item.id)
              ),
              sub_category: res.data['sub-category'].filter((item: any) =>
              this.customerData['sub_category'].split(',').includes(item.id)
            ),
            });
            this.filteredSubCat = this.subCategory?.filter((cat: any) =>
              this.customerData.category?.split(',').includes(cat.category_id)
            );
          }
        } else {
          console.error('Category fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Category fetch failed', error);
      }
    );
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
