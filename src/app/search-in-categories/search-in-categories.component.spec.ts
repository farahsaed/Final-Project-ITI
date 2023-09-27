import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInCategoriesComponent } from './search-in-categories.component';

describe('SearchInCategoriesComponent', () => {
  let component: SearchInCategoriesComponent;
  let fixture: ComponentFixture<SearchInCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInCategoriesComponent]
    });
    fixture = TestBed.createComponent(SearchInCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
