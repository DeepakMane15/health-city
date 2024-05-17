import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivingRoutingModule } from './living-routing.module';
import { LivingListComponent } from './living-list/living-list.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddLivingComponent } from './add-living/add-living.component';
import { LivingBoardComponent } from './living-board/living-board.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewLivingComponent } from './view-living/view-living.component';

@NgModule({
  declarations: [
    LivingListComponent,
    AddLivingComponent,
    LivingBoardComponent,
    ViewLivingComponent
  ],
  imports: [
    CommonModule,
    LivingRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableModule,
    MatGridListModule,
    MatTabsModule,
    MatRadioModule,
    FlexLayoutModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class LivingModule { }
