import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {NgIf} from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatPaginatorModule } from '@angular/material/paginator';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponentComponent } from './form-component/form-component.component';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { CustomerAnalyticsComponent } from './customer-analytics/customer-analytics.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';







@NgModule({
  
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerDialogComponent,
    ConfirmationDialogComponent,
    FormComponentComponent,
    CustomerAnalyticsComponent,
    LoginComponent,
    ToolbarComponent,
    SidebarComponent,
   
   
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgIf,
    MatDatepickerModule,
    FlexLayoutModule,
    NgbModule,
    MatSnackBarModule,
    MatNativeDateModule,
    HttpClientModule,
    MatCardModule,
    NgApexchartsModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule
  
    
   

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
