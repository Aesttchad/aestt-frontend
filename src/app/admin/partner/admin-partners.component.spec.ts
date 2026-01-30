import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartnersComponent } from './admin-partners.component';

describe('AdminPartnersComponent', () => {
  let component: AdminPartnersComponent;
  let fixture: ComponentFixture<AdminPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPartnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
