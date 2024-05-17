import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { AuthComponent } from './auth/auth.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlaySpinnerComponent } from './shared/loader/overlay-spinner/overlay-spinner.component';
import { TeamBoardComponent } from './team-board/team-board.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewMedicalComponent } from './view-medical/view-medical.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { TeamInvitationComponent } from './team-invitation/team-invitation.component';
import { NgxStripeModule } from 'ngx-stripe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CardComponent } from './card/card.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChartModule } from 'angular-highcharts';
import { AnnualSalesChartComponent } from './annual-sales-chart/annual-sales-chart.component';
import { ProductSalesChartComponent } from './product-sales-chart/product-sales-chart.component';
import { StoreSessionsChartComponent } from './store-sessions-chart/store-sessions-chart.component';
import { SalesTrafficChartComponent } from './sales-traffic-chart/sales-traffic-chart.component';
import { MatSortModule } from '@angular/material/sort';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { LastFewTransactionsComponent } from './last-few-transactions/last-few-transactions.component';
import { TopThreeProductsComponent } from './top-three-products/top-three-products.component';
//import { DocumentComponent } from './document/document.component';
import { AssignmentStatusProComponent } from './assignment-status-pro/assignment-status-pro.component';
import { TransactionStatusProComponent } from './transaction-status-pro/transaction-status-pro.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CreateGroupModalComponent } from './new-chat/create-group-modal/create-group-modal.component';
import { ResetPasswordComponent } from './shared/dialog/reset-password/reset-password.component';
import { UploadProfileComponent } from './shared/dialog/upload-profile/upload-profile.component';
import { AddFormPopupComponent } from './shared/dialog/add-form-popup/add-form-popup.component';
import { PatientModule } from './patient/patient.module';
import { DriverModule } from './driver/driver.module';
import { DeleteConfirmComponent } from './shared/dialog/delete-confirm/delete-confirm.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    OverlaySpinnerComponent,
    TeamBoardComponent,
    ViewMedicalComponent,
    PaymentModalComponent,
    TeamInvitationComponent,
    CardComponent,
    Dashboard2Component,
    AnnualSalesChartComponent,
    ProductSalesChartComponent,
    StoreSessionsChartComponent,
    SalesTrafficChartComponent,
    LastFewTransactionsComponent,
    TopThreeProductsComponent,
    //DocumentComponent,
    AssignmentStatusProComponent,
    TransactionStatusProComponent,
    CreateGroupModalComponent,
    ResetPasswordComponent,
    UploadProfileComponent,
    AddFormPopupComponent,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    NgxStripeModule.forRoot(environment.publishableKey),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBAztsIXonxMQ3DP70bFYgqClDw1QvCIp4',
    // }),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatProgressSpinnerModule,
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
    MatPaginatorModule,
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatAutocompleteModule,
    ChartModule,
    MatSortModule,
    MatChipsModule,
    MatChipListbox,
    NgMultiSelectDropDownModule.forRoot(),
    PatientModule,
    DriverModule
  ],
  exports: [OverlaySpinnerComponent],
  providers: [
    provideAnimationsAsync(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
