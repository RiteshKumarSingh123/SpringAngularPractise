import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootPractiseWorkerComponent } from './spring-boot-practise-worker.component';

describe('SpringBootPractiseWorkerComponent', () => {
  let component: SpringBootPractiseWorkerComponent;
  let fixture: ComponentFixture<SpringBootPractiseWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpringBootPractiseWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpringBootPractiseWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
