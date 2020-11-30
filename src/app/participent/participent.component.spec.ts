import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipentComponent } from './participent.component';

describe('ParticipentComponent', () => {
  let component: ParticipentComponent;
  let fixture: ComponentFixture<ParticipentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
