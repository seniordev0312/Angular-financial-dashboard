import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@root/shared/shared.module';
import { ChatModule } from '../chat/chat.module';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { GroupComponent } from './components/group/group.component';

@NgModule({
    declarations: [
        GroupCardComponent,
        GroupComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        MatIconModule,
        ChatModule
    ],
    exports: [GroupComponent],
    providers: [],
})
export class GroupModule { }
