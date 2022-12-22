import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        ToolbarComponent,
        DropdownComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatInputModule
    ],
    providers: [],
    exports: [ToolbarComponent]
})
export class ToolbarModule { }
