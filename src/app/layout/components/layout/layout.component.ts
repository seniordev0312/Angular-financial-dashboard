import { Component, OnInit } from '@angular/core';
import { ContentHeaderModel } from '@root/shared/models/content-header/content.header';
import { UiService } from '@root/shared/services/ui.service';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  RSideBarOpen: boolean = false;
  LSideBarOpen: boolean = true;
  contentHeaderModel: ContentHeaderModel;

  isRTLDirection$ = this.layoutService.isRTLDirection$;

  constructor(
    private layoutService: LayoutService,
    private uiService: UiService
  ) {
    this.onUpdateContentHeaderToggle();
    console.log(this.contentHeaderModel?.paths);

  }

  ngOnInit(): void {
    this.layoutService.isRTLDirection$.next(true)
  }

  LSideBarToggle() {
    throw new Error('Method not implemented.');
  }
  onUpdateContentHeaderToggle(): void {
    this.uiService.onUpdateContentHeaderToggle().subscribe((contentHeaderModel: ContentHeaderModel) => {
      this.contentHeaderModel = contentHeaderModel;
    })
  }

}
