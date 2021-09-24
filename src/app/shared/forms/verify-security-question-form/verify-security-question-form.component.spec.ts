import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySecurityQuestionFormComponent } from './verify-security-question-form.component';

describe('VerifySecurityQuestionFormComponent', () => {
  let component: VerifySecurityQuestionFormComponent;
  let fixture: ComponentFixture<VerifySecurityQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySecurityQuestionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifySecurityQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
