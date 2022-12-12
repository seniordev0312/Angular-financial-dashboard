import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { card } from '@root/shared/models/card/card.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-entities-management',
  templateUrl: './entities-management.component.html',
  styleUrls: ['./entities-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesManagementComponent implements OnInit {
  cards: card[] = [
    {
      title: 'Entity References Setup',
      items: [
        {
          title: 'Manage Entity Section Templates',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesTemplates}`
        },
        {
          title: 'Manage Entity Relationship Types',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesRelationshipTypesManagement}`
        },
        {
          title: 'Manage KYC Document Types',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesKYCDocumentTypesManagement}`
        }
      ],
      backgroundColor: '#186AA5'
    },
    {
      title: 'Entity Sources Setup',
      items: [
        {
          title: 'Manage Entity Sources',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesSourcesManagement}`
        },
        {
          title: 'Manage Entity Mapping',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesMappingManagement}`
        },
      ],
      backgroundColor: '#469CD9'
    },
    {
      title: 'Entity Management',
      items: [
        {
          title: 'Manage Entities',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`
        },
      ],
      backgroundColor: '#7BC8FF'
    }
  ];
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.EntitiesManagement,
          translationKey: 'entities-management.entities-management'
        }
      ],
    });
  }

}
