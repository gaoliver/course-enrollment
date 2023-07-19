import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninTabComponent } from './signin-tab.component';

describe('SigninTabComponent', () => {
  let component: SigninTabComponent;
  let fixture: ComponentFixture<SigninTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninTabComponent]
    });
    fixture = TestBed.createComponent(SigninTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
