import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-system-settings',
  templateUrl: './general-system-settings.component.html',
  styleUrls: ['./general-system-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSystemSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
