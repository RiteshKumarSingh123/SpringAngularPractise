import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootPractiseCustomerComponent } from './spring-boot-practise-customer.component';

describe('SpringBootPractiseCustomerComponent', () => {
  let component: SpringBootPractiseCustomerComponent;
  let fixture: ComponentFixture<SpringBootPractiseCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpringBootPractiseCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpringBootPractiseCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
