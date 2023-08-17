import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ],
})

export class AppComponent {
  title = 'WEB';
  isOpened=false;
  sidebarVisible1=false;
  constructor(private authGaurd:AuthService) {
  
}
}
