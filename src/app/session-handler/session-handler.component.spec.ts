import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHandlerComponent } from './session-handler.component';

describe('SessionHandlerComponent', () => {
  let component: SessionHandlerComponent;
  let fixture: ComponentFixture<SessionHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SessionHandlerComponent]
    });
    fixture = TestBed.createComponent(SessionHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
