import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { CustomerAnalyticsComponent } from './customer-analytics/customer-analytics.component';
import { LoginComponent } from './login/login.component';
import { GameCardComponent } from './game-card/game-card.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [
  {  path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent }, // Redirect to /customers by default
  { path: 'customers', component: CustomerComponent}, // Customers route
  { path: 'form', component: FormComponentComponent }, // Add the route for the Form Component
  { path: 'analytics', component:CustomerAnalyticsComponent},
  {path: 'cards', component:GameCardComponent},
  {path: 'home', component:HomeComponent},
  {path: 'signup', component:SignupComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
