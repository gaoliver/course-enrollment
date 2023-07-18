import { Component } from '@angular/core';
import { navbar } from 'src/app/app-routing.module';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  pagesList = navbar;
}
