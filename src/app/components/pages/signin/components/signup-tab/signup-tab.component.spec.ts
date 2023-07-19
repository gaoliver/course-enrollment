import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTabComponent } from './signup-tab.component';

describe('SignupTabComponent', () => {
  let component: SignupTabComponent;
  let fixture: ComponentFixture<SignupTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupTabComponent]
    });
    fixture = TestBed.createComponent(SignupTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
