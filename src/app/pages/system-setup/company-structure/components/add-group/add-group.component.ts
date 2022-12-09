import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGroupComponent implements OnInit {

  constructor(
    private layoutService: LayoutService) { }

  ngOnInit(): void {
  }

  onSave(): void {
    this.layoutService.closeRightSideNav();
  }

  onCancel(): void {
    this.layoutService.closeRightSideNav();
  }

}
