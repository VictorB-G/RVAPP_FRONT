import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadesDetailComponent } from './ciudades-detail.component';

describe('CiudadesDetailComponent', () => {
  let component: CiudadesDetailComponent;
  let fixture: ComponentFixture<CiudadesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
