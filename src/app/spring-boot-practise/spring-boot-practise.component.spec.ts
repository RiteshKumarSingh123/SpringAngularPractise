import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootPractiseComponent } from './spring-boot-practise.component';

describe('SpringBootPractiseComponent', () => {
  let component: SpringBootPractiseComponent;
  let fixture: ComponentFixture<SpringBootPractiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpringBootPractiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpringBootPractiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
