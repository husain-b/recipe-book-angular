import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerttComponent } from './alertt.component';

describe('AlerttComponent', () => {
  let component: AlerttComponent;
  let fixture: ComponentFixture<AlerttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlerttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
