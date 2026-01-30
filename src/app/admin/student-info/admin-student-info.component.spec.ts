import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentInfoComponent } from './admin-student-info.component';

describe('EventsComponent', () => {
  let component: AdminStudentInfoComponent;
  let fixture: ComponentFixture<AdminStudentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStudentInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
