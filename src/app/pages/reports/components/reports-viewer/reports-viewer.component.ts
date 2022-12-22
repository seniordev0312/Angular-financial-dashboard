import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AR_EXPORTS, HtmlExportService, PdfExportService, TabularDataExportService, ViewerComponent } from '@grapecity/activereports-angular';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { ReportsService } from '../../shared/services/reports.service';
import { reportsViewerNavList } from './reports-viewer-nav-list';

// import { reports$ } from '../../shared/store/reports.store';

@Component({
  selector: 'app-reports-viewer',
  templateUrl: './reports-viewer.component.html',
  styleUrls: ['./reports-viewer.component.scss'],
  providers: [
    {
      provide: AR_EXPORTS,
      useClass: PdfExportService,
      multi: true,
    },
    {
      provide: AR_EXPORTS,
      useClass: HtmlExportService,
      multi: true,
    },
    {
      provide: AR_EXPORTS,
      useClass: TabularDataExportService,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsViewerComponent extends BaseComponent implements OnInit {

  @ViewChild(ViewerComponent, { static: false }) reportViewer!: ViewerComponent;

  navList = reportsViewerNavList;

  ID = -1;

  reportA: any;
  reportB: any;
  reportC: any;

  onViewerInit() {
    this.reportA = this.reportsService.getReportA();
    this.reportB = this.reportsService.getReportB();
    this.reportC = this.reportsService.getReportC();
    this.reportViewer.open(this.reportA.definition);
  }

  report: any
  constructor(
    private layoutService: LayoutService,
    private reportsService: ReportsService,
  ) { super(); }

  ngOnInit(): void {
    // this.report = { id: '../../../../../../assets/reports/report.rdlx', displayName: 'my report' };
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.Reports,
          translationKey: 'reports.reports'
        },
        {
          route: ApplicationRoutes.ReportsViewer,
          translationKey: 'reports.report-viewer.report-viewer'
        }
      ],
    });


    // this.subscriptions.add(
    //   reports$.subscribe((data: any) => {
    //     if (data) {
    //       this.reportViewer.open
    //       console.log(data);
    //     }
    //   })
    // )
  }

  onItemClick(navListItem: number) {
    this.ID = navListItem;
    if (this.ID === 1) {
      this.reportViewer.open(this.reportA.definition);
    }
    if (this.ID === 2) {
      this.reportViewer.open(this.reportB.definition);
    }
    if (this.ID === 3) {
      this.reportViewer.open(this.reportC.definition);
    }

  }

}
