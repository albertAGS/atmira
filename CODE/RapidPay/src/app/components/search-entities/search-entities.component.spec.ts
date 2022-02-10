import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEntitiesComponent } from './search-entities.component';

describe('SearchEntitiesComponent', () => {
  let component: SearchEntitiesComponent;
  let fixture: ComponentFixture<SearchEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
