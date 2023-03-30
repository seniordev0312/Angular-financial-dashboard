import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { EntitiesControlService } from '../../services/entity-control.service';
import { entityDefinitionsReferenceList$ } from '../../store/entities-control.store';

@Component({
  selector: 'app-entity-type',
  templateUrl: './entity-type.component.html',
  styleUrls: ['./entity-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTypeComponent extends BaseComponent implements OnInit {
  entityTypeFormControl = new FormControl();
  entityDefinitionsReferenceList: BaseListItem[];

  constructor(private cdr: ChangeDetectorRef, private entitiesControlService: EntitiesControlService) { super(); }

  ngOnInit(): void {
    this.subscriptions.add(entityDefinitionsReferenceList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.entityDefinitionsReferenceList = data.map(e => ({ id: e.code, value: e.name }));
      }
      this.cdr.detectChanges();
    }));

    this.subscriptions.add(this.entityTypeFormControl.valueChanges.subscribe(data => {
      this.entitiesControlService.getEntityDefinitionsList(data);
    }));
  }

}
