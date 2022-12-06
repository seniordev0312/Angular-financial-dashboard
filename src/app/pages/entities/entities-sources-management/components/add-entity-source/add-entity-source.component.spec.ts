import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntitySourceComponent } from './add-entity-source.component';

describe('AddEntitySourceComponent', () => {
  let component: AddEntitySourceComponent;
  let fixture: ComponentFixture<AddEntitySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntitySourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntitySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
