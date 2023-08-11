import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { CustomerAnalyticsComponent } from './customer-analytics/customer-analytics.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {  path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent }, // Redirect to /customers by default
  { path: 'customers', component: CustomerComponent }, // Customers route
  { path: 'form', component: FormComponentComponent }, // Add the route for the Form Component
  { path: 'analytics', component:CustomerAnalyticsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
