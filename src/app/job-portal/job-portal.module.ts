import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPortalRoutingModule } from './job-portal-routing.module';
import { JobPortalListComponent } from './job-portal-list/job-portal-list.component';
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
import { AddJobOpeningComponent } from './add-job-opening/add-job-opening.component';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { ViewJobOpeningComponent } from './view-job-opening/view-job-opening.component';
@NgModule({
  declarations: [JobPortalListComponent, AddJobOpeningComponent, ViewJobOpeningComponent],
  imports: [
    CommonModule,
    JobPortalRoutingModule,
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
    TextFieldModule,
    CdkTextareaAutosize,
  ],
})
export class JobPortalModule {}
