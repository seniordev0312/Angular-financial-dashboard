import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-assentify-processing',
  templateUrl: './assentify-processing.component.html',
  styleUrls: ['./assentify-processing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssentifyProcessingComponent implements OnInit {
  chatMenuOptions: string[] = [
    'Medical Insurance ADALs',
    'Travel Insurance ADALs',
    'Motor Insurance ADALs',
    'Group Medical Insurance ADALs',
    'Customer Insurance ADALs',
  ];

  chatMenuClicked: boolean = false;

  @Input()
  isDepartmentChat: boolean;
  
  constructor() {}

  ngOnInit(): void {}

  onClickAssentifyLogo() {
    this.chatMenuClicked = !this.chatMenuClicked;
  }
}
