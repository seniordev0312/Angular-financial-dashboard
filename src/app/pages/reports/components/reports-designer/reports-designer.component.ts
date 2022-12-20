import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DesignerComponent } from '@grapecity/activereports-angular';
import { ReportsService } from '../../shared/services/reports.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-reports-designer',
  templateUrl: './reports-designer.component.html',
  styleUrls: ['./reports-designer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsDesignerComponent implements OnInit, AfterViewInit, OnDestroy {

  saveIntervalId: any;
  report: any;
  @ViewChild(DesignerComponent, { static: false }) reportDesigner: DesignerComponent;

  constructor(
    private layoutService: LayoutService,
    private reportsService: ReportsService,
  ) { }

  onSave = function (info: any) {
    // the implementation of the onSave handler
    console.log(info);


    // const reportId = info.id || `report${counter.current++}`;
    // setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    // return Promise.resolve({ displayName: reportId });

  };


  ngOnInit(): void {
    this.report = { id: '../../../../../../assets/reports/report-designer.rdlx-json', displayName: 'my report' };
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.Reports,
          translationKey: 'reports.reports'
        },
        {
          route: ApplicationRoutes.ReportsDesigner,
          translationKey: 'reports.report-designer.report-designer'
        }
      ],
    });
  }

  ngAfterViewInit(): void {
    this.reportDesigner.createReport({ reportType: 'CPL' })
    this.saveIntervalId = setInterval(async () => {
      const reportInfo = await this.reportDesigner.getReport();
      this.reportsService.updateReports(reportInfo)
    }, 5000);
  }
  ngOnDestroy(): void {
    clearInterval(this.saveIntervalId);
  }

  onSaveAs(info: any) {
    console.log(info);
    const reportId = info.id;
    // setReportStorage(new Map(reportStorage.set(reportId, info.definition)));
    return Promise.resolve({ id: reportId, displayName: reportId });
  };

}
