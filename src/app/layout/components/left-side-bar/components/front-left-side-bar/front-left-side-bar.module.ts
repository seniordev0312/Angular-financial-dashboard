import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@root/shared/shared.module';
import { DirectModule } from './components/direct/direct.module';
import { FrontLeftSideBarComponent } from './components/front-left-side-bar/front-left-side-bar.component';
import { GroupModule } from './components/group/group.module';

@NgModule({
    declarations: [
        FrontLeftSideBarComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        DirectModule,
        GroupModule,
        MatIconModule,
        MatTabsModule
    ],
    exports: [FrontLeftSideBarComponent],
    providers: [],
})
export class FrontLeftSideBarModule { }
