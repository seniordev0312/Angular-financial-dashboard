import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesControlComponent } from './entities-control.component';

describe('EntitiesControlComponent', () => {
  let component: EntitiesControlComponent;
  let fixture: ComponentFixture<EntitiesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
