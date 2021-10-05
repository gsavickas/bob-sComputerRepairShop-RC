/**
 * * Title: services.component.spec.ts
 * Author: Larry Ohaka
 * Date: 7/25/21
 * Description: Input Properties
 */

/**
 * * Title: services.component.spec.ts
 * Author: Larry Ohaka
 * Date: 7/25/21
 * Description: Input Properties
 */

 import { ComponentFixture, TestBed } from '@angular/core/testing';
 import { ServicesComponent } from './services.component';


 describe('ServicesComponent', () => {
   let component: ServicesComponent;
   let fixture: ComponentFixture<ServicesComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [ServicesComponent],
     }).compileComponents();
   });

   beforeEach(() => {
     fixture = TestBed.createComponent(ServicesComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create', () => {
     expect(component).toBeTruthy();
   });

   // test that clearButton calls clearCheckboxes()
   it('should', fakeAsync(() => {
     spyOn(component, 'clearCheckboxes');

     let button =
       fixture.debugElement.nativeElement.getElementById('clearButton');
     button.click();
     tick();
     expect(component.clearCheckboxes).toHaveBeenCalled();
   }));

   // test that clearButton calls clearInputs()
   it('should', fakeAsync(() => {
     spyOn(component, 'clearInputs');

     let button =
       fixture.debugElement.nativeElement.getElementById('clearButton');
     button.click();
     tick();
     expect(component.clearInputs).toHaveBeenCalled();
   }));

   // test that calculateButton calls calculateTotalServices()
   it('should', fakeAsync(() => {
     spyOn(component, 'calculateTotalServices');

     let button =
       fixture.debugElement.nativeElement.getElementById('calculateButton');
     button.click();
     tick();
     expect(component.calculateTotalServices).toHaveBeenCalled();
   }));

   // test that calculateButton calls calculatePartsAndHours()
   it('should', fakeAsync(() => {
     spyOn(component, 'calculatePartsAndHours');

     let button =
       fixture.debugElement.nativeElement.getElementById('calculateButton');
     button.click();
     tick();
     expect(component.calculatePartsAndHours).toHaveBeenCalled();
   }));
 });
