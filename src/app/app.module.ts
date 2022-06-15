import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { NgChartsModule } from 'ng2-charts';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { AddCompanyComponent } from './profile/add-company/add-company.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { DatePipe } from '@angular/common';
import { ViewOrderComponent } from './orders/view-order/view-order.component';
import { CheckOutComponent } from './orders/check-out/check-out.component';
import { TrackOrdersComponent } from './orders/track-orders/track-orders.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReportComponent } from './orders/report/report.component';
import { TransactionsComponent } from './orders/transactions/transactions.component';
import { CompaniesComponent } from './profile/companies/companies.component';
import { ViewCompanyComponent } from './profile/view-company/view-company.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { PreloaderComponent } from './preloader/preloader.component';
import { MakePaymentComponent } from './orders/make-payment/make-payment.component';
import { ListByIdComponent } from './orders/list-by-id/list-by-id.component';
import { PendingOrdersComponent } from './orders/pending-orders/pending-orders.component';
import { ProcessingOrdersComponent } from './orders/processing-orders/processing-orders.component';
import { CompletedOrdersComponent } from './orders/completed-orders/completed-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    ViewProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    AddCompanyComponent,
    AddOrderComponent,
    OrdersComponent,
    ViewOrderComponent,
    CheckOutComponent,
    TrackOrdersComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ReportComponent,
    TransactionsComponent,
    CompaniesComponent,
    ViewCompanyComponent,
    PreloaderComponent,
    MakePaymentComponent,
    ListByIdComponent,
    PendingOrdersComponent,
    ProcessingOrdersComponent,
    CompletedOrdersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
FormsModule,
Ng2GoogleChartsModule,
NgChartsModule,
NgCircleProgressModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
