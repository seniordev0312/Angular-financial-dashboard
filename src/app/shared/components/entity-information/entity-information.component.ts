import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EntityTemplatePercentage } from '@root/shared/models/entities/entity-template-percentage.model';
import { EntityTemplate } from '@root/shared/models/entities/entity-template.model';

@Component({
  selector: 'app-entity-information',
  templateUrl: './entity-information.component.html',
  styleUrls: ['./entity-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityInformationComponent {
  @Input() label: string;
  @Input() showSelectButton = false;
  @Input() isMatchCard = false;
  @Input() hasContent = false;
  @Input() entityTemplatePercentage: EntityTemplatePercentage;
  @Input() entityTemplate: EntityTemplate;

  constructor() { }


  getMatchColor(value: string): string {
    if (this.isMatchCard) {
      return this.entityTemplatePercentage[value as keyof EntityTemplatePercentage] > 50 ? 'text-success' : 'text-warn';
    }
    return '';
  }
}
