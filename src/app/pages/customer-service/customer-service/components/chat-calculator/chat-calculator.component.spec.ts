import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCalculatorComponent } from './chat-calculator.component';

describe('ChatCalculatorComponent', () => {
  let component: ChatCalculatorComponent;
  let fixture: ComponentFixture<ChatCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
