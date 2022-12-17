import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChipComponent } from './group-chip.component';

describe('GroupChipComponent', () => {
  let component: GroupChipComponent;
  let fixture: ComponentFixture<GroupChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
