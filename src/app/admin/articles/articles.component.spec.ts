import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesComponent } from './articles.component';

describe('ArticleComponent', () => {
  let component: AdminArticlesComponent;
  let fixture: ComponentFixture<AdminArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
