import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@root/shared/shared.module';
import { AudioMessageComponent } from './components/audio-message/audio-message.component';
import { ChatCardComponent } from './components/chat-card/chat-card.component';
import { MessageCardComponent } from './components/message-card/message-card.component';
import { PlyrModule } from 'ngx-plyr';

@NgModule({
    declarations: [
        ChatCardComponent,
        MessageCardComponent,
        AudioMessageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        MatIconModule,
        PlyrModule
    ],
    exports: [
        ChatCardComponent,
        MessageCardComponent
    ],
    providers: [],
})
export class ChatModule { }
