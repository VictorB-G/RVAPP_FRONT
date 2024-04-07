import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoRegisterComponent } from './auto-register.component';

describe('AutoRegisterComponent', () => {
  let component: AutoRegisterComponent;
  let fixture: ComponentFixture<AutoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoRegisterComponent]
    });
    fixture = TestBed.createComponent(AutoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
