import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinasDetailComponent } from './oficinas-detail.component';

describe('OficinasDetailComponent', () => {
  let component: OficinasDetailComponent;
  let fixture: ComponentFixture<OficinasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OficinasDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OficinasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
