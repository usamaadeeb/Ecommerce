import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBEComponent } from './cart-be.component';

describe('CartBEComponent', () => {
  let component: CartBEComponent;
  let fixture: ComponentFixture<CartBEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartBEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
