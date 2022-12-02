import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesViewerComponent } from './components/entities-viewer/entities-viewer.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { ProfileRatioComponent } from './components/profile-ratio/profile-ratio.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@root/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Route[] = [
];

@NgModule({
  declarations: [
    EntitiesViewerComponent,
    ProfileOverviewComponent,
    ProfileRatioComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    MatDialogModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesViewerModule { }
