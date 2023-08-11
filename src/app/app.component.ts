import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

interface SidenavItem {
  name: string;
  icon: string;
  link?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent {
isExpanded: boolean=false;
  title: any;
onMouseEnter() {
throw new Error('Method not implemented.');
}
onMouseLeave() {
throw new Error('Method not implemented.');
}
  isOpened: boolean = false;

  sidenavItems: SidenavItem[] = [
    {
      name: 'Customer',
      icon: 'person',
      link: '/customer'
    },
    
    {
      name: 'Form',
      icon: 'description',
      link: '/form-component'
    },
    
    
  ];
}
