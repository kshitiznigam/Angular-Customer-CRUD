import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router) {}
  isExpanded: boolean = false;

  navigateToCustomerComponent() {
    this.router.navigate(['/customer']);
  }

  navigateToFormComponent() {
    this.router.navigate(['/form']);
  }

  navigateToAnalyticsComponent(){
    this.router.navigate(['/analytics']);
  }
  

  expandSidebar() {
    this.isExpanded = true;
  }

  collapseSidebar() {
    this.isExpanded = false;
  }
}
