import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoutingModule } from './medical-routing.module';
import { MedicalListComponent } from './medical-list/medical-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddMedicalComponent } from './add-medical/add-medical.component';
import { ViewMedicalComponent } from './view-medical/view-medical.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SparePartComponent } from './spare-part/spare-part.component';
import { AddSparePartComponent } from './add-spare-part/add-spare-part.component';
import { PollutionListComponent } from './pollution-list/pollution-list.component';
import { AddPollutionComponent } from './add-pollution/add-pollution.component';
// import { MedicalListComponent } from '../medical-list/medical-list.component';


@NgModule({
  declarations: [
    MedicalListComponent,
    AddMedicalComponent,
    ViewMedicalComponent,
    SparePartComponent,
    AddSparePartComponent,
    PollutionListComponent,
    AddPollutionComponent
  ],
  imports: [
    CommonModule,
    MedicalRoutingModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDatepickerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers:[provideNativeDateAdapter()]
})
export class MedicalModule { }
