import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCatalogComponent } from './catalog.component';

describe('DisplayCatalogComponent', () => {
  let component: DisplayCatalogComponent;
  let fixture: ComponentFixture<DisplayCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCatalogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
