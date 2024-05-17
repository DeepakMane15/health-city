import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbulanceRoutingModule } from './ambulance-routing.module';
import { AmbulanceListComponent } from './ambulance-list/ambulance-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AddAmbulanceComponent } from './add-ambulance/add-ambulance.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewAmbulanceComponent } from './view-ambulance/view-ambulance.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [AmbulanceListComponent, AddAmbulanceComponent, ViewAmbulanceComponent],
  imports: [
    CommonModule,
    AmbulanceRoutingModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    FlexLayoutModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [provideNativeDateAdapter()],
})
export class AmbulanceModule { }
