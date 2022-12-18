import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@root/shared/shared.module';
import { ChatModule } from '../chat/chat.module';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { DirectComponent } from './components/direct/direct.component';

@NgModule({
    declarations: [
        ContactCardComponent,
        DirectComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        MatIconModule,
        ChatModule
    ],
    exports: [DirectComponent],
    providers: [],
})
export class DirectModule { }
