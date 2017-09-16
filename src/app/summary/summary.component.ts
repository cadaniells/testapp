import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../service/summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: any = [];
  allProperties: any = [];
  propertySelected = '';

  constructor(private summaryService: SummaryService) { }

  onPropertyChange(propertyName):void {

    this.summaryService.getPropertySummary(propertyName).subscribe(summary => {
      this.summary =[];
      for (let i in summary) {
        let val = summary[i];
        if (i != "_id") {
          this.summary.push({ i, val});
        }
      }
    });
  }

  ngOnInit() {
    this.summaryService.getPropertyList().subscribe(property => {
      for (let key in property) {
        let val = property[key];
        let value = val['address'];
        this.allProperties.push({ key, value });
      }
    });
    this.propertySelected = this.allProperties[0];
  }

}
