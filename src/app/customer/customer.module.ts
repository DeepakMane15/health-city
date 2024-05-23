import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule,
} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CustomerRoutingModule } from './customer-routing.module';
import {
  CustomersListComponent,
} from './customers-list/customers-list.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

@NgModule({
  declarations: [CustomersListComponent, AddCustomerComponent, ViewCustomerComponent, AddUserComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule,
    MatDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatToolbarModule
  ],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }, // Change 'primary' to 'accent' or 'warn' as desired
    },
  ],
})
export class CustomerModule {}
