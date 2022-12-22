import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DesignerComponent } from '@grapecity/activereports-angular';
import { ReportsService } from '../../shared/services/reports.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { reportsDesignerNavList } from './reports-designer-nav-list';


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


  navList = reportsDesignerNavList;

  ID = -1;
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
      if (this.ID === 1) {
        this.reportsService.updateReportA(reportInfo)
      }
      if (this.ID === 2) {
        this.reportsService.updateReportB(reportInfo)
      }
      if (this.ID === 3) {
        this.reportsService.updateReportC(reportInfo)
      }

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


  onItemClick(navListItem: number) {
    this.ID = navListItem;
    console.log(this.ID)
    if (this.ID === 1) {
      this.reportDesigner.setReport(this.reportsService.getReportA());
    }
    if (this.ID === 2) {
      this.reportDesigner.setReport(this.reportsService.getReportB());
    }
    if (this.ID === 3) {
      this.reportDesigner.setReport(this.reportsService.getReportC());
    }
  }
}
