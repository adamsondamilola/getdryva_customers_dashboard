import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { MainComponent } from './main/main.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { CheckOutComponent } from './orders/check-out/check-out.component';
import { CompletedOrdersComponent } from './orders/completed-orders/completed-orders.component';
import { ListByIdComponent } from './orders/list-by-id/list-by-id.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { PendingOrdersComponent } from './orders/pending-orders/pending-orders.component';
import { ProcessingOrdersComponent } from './orders/processing-orders/processing-orders.component';
import { ReportComponent } from './orders/report/report.component';
import { TransactionsComponent } from './orders/transactions/transactions.component';
import { ViewOrderComponent } from './orders/view-order/view-order.component';
import { AddCompanyComponent } from './profile/add-company/add-company.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { CompaniesComponent } from './profile/companies/companies.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ViewCompanyComponent } from './profile/view-company/view-company.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgot_password', component: ForgotPasswordComponent},
  {path: 'verify_email', component: VerifyEmailComponent},
  {path: 'profile', component: ViewProfileComponent},
  {path: 'account_settings', component: EditProfileComponent},
  {path: 'change_password', component: ChangePasswordComponent},
  { path: ':token/main', component: MainComponent },
  { path: 'add_company', component: AddCompanyComponent },
  { path: 'add_order', component: AddOrderComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'pending_orders', component: PendingOrdersComponent },
  { path: 'processing_orders', component: ProcessingOrdersComponent },
  { path: 'completed_orders', component: CompletedOrdersComponent },
  { path: 'check_out', component: CheckOutComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: ':id/order', component: ViewOrderComponent },
  { path: ':id/view_company', component: ViewCompanyComponent },
  { path: ':id/order_list', component: ListByIdComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
