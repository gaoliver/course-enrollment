import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mobileNav } from '@src/app/app-routing.module';

@Component({
  selector: 'app-sidemenu-mobile',
  templateUrl: './sidemenu-mobile.component.html',
  styleUrls: ['./sidemenu-mobile.component.scss'],
})
export class SidemenuMobileComponent {
  @Input() isOpen: boolean = false;
  @Output() onPressClose = new EventEmitter<boolean>();

  onPressCloseBtn() {
    this.onPressClose.emit(!this.isOpen);
  }

  pagesList = mobileNav;
}
