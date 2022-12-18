import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { card } from '@root/shared/models/card/card.model';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { LayoutService } from '@root/shared/services/layout.service';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';
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
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesTemplates}`,
          permission: Permission.CanAccessEntityTemplate
        },
        {
          title: 'Manage Entity Relationship Types',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesRelationshipTypesManagement}`,
          permission: Permission.CanAccessEntityRelationshipType
        },
        {
          title: 'Manage KYC Document Types',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesKYCDocumentTypesManagement}`,
          permission: Permission.CanAccessEntityKYCDocument
        }
      ],
      backgroundColor: '#186AA5'
    },
    {
      title: 'Entity Sources Setup',
      items: [
        {
          title: 'Manage Entity Sources',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesSourcesManagement}`,
          permission: Permission.CanAccessEntitySources
        },
        {
          title: 'Manage Entity Mapping',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesMappingManagement}`,
          permission: Permission.CanAccessEntityMapping
        },
      ],
      backgroundColor: '#469CD9'
    },
    {
      title: 'Entity Management',
      items: [
        {
          title: 'Manage Entities',
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`,
          permission: Permission.CanAccessEntityManagement
        },
      ],
      backgroundColor: '#7BC8FF'
    }
  ];

  constructor(private layoutService: LayoutService,
    private securityCheckerService: SecurityCheckerService) { }

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

  showCard(card: card) {
    let showCard = true;
    card.items.forEach(item => {
      if (!this.securityCheckerService.doesUserHasPermission(item.permission)) {
        showCard = false;
      }
    });
    return showCard;
  }
}
