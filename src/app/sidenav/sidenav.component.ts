import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavbarComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  isExpanded: boolean = false;

  constructor(private router: Router) {}

  onCustomersClick(): void {
    // Navigate to the CustomerComponent when clicking on "Customers" link
    this.router.navigate(['/customers']);
  }

  onFormClick(): void {
    // Navigate to the FormComponent when clicking on "Form" link
    this.router.navigate(['/form']);
  }

  onAnalyticsClick(): void {
    // Navigate to the FormComponent when clicking on "Form" link
    this.router.navigate(['/analytics']);
  }

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.drawer.open();
    } else {
      this.drawer.close();
    }
  }
}




