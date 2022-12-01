import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityChecksComponent } from './create-entity-checks.component';

describe('CreateEntityChecksComponent', () => {
  let component: CreateEntityChecksComponent;
  let fixture: ComponentFixture<CreateEntityChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEntityChecksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntityChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
