import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AR_EXPORTS, HtmlExportService, PdfExportService, TabularDataExportService, ViewerComponent } from '@grapecity/activereports-angular';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { ReportsService } from '../../shared/services/reports.service';

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

  onViewerInit() {
    let reports = this.reportsService.getReports();
    console.log(reports[0].definition);
    this.reportViewer.open(reports[0].definition);
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

}
