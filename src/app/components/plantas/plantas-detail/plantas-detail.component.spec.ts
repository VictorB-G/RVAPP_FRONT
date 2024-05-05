import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasDetailComponent } from './plantas-detail.component';

describe('PlantasDetailComponent', () => {
  let component: PlantasDetailComponent;
  let fixture: ComponentFixture<PlantasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantasDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
