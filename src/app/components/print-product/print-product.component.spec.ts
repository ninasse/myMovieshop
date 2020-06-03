import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintProductComponent } from './print-product.component';

describe('PrintProductComponent', () => {
  let component: PrintProductComponent;
  let fixture: ComponentFixture<PrintProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
