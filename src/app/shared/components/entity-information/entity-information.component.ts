import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-information',
  templateUrl: './entity-information.component.html',
  styleUrls: ['./entity-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityInformationComponent implements OnInit {
  @Input() label: string;
  @Input() showSelectButton = false;
  @Input() isMatchCard = false;
  @Input() hasContent = false;
  @Input() entityTemplate: any;
  newEntity: any;
  result: any;

  constructor() { }
  ngOnInit(): void {
    this.newEntity = Object.entries(this.entityTemplate);
  }


  getMatchColor(value: number): string {
    if (this.isMatchCard) {
      return value > 50 ? 'text-success' : 'text-warn';
    }
    return '';
  }
}
