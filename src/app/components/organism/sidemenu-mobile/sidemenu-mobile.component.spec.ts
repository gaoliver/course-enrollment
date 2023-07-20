import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuMobileComponent } from './sidemenu-mobile.component';

describe('SidemenuMobileComponent', () => {
  let component: SidemenuMobileComponent;
  let fixture: ComponentFixture<SidemenuMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidemenuMobileComponent]
    });
    fixture = TestBed.createComponent(SidemenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
