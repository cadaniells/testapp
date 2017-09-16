import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SummaryService } from '../service/summary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Variables 
  selectedProperty:String = 'ALL';
  graphExpenses:String = "Property Expenses";
  properties: any[]= [];
  dataValues: any[] = [];
  startDate: Number;
  endDate: Number;
  noDates: boolean = true;

  // GRAPH - Variables 
  single: any[] = [];
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Category';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';

  // TABLE - Config Setup 
  data: any[] = [];

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: true
    },
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },    
    columns: {
      property: {
        title: 'Property Name',
        editable: false,
        filter: false
      },
      category: {
        title: 'Category',
        filter: false
      },
      company: {
        title: 'Company',
        filter: false
      },
      amount: {
        title: 'Amount',
        filter: false
      },
      dueDate: {
        title: 'Due Date',
        filter: false
      },
      taxType: {
        title: 'Tax Type',
        filter: false
      },
      frequency: {
        title: 'Frequency',
        filter: false
      }
    }
  };

  constructor(private service: SummaryService) { 
    // GRAPH - binding data 
    Object.assign(this, this.single) 
  }

  ngOnInit() {
    // SERVICE - get list of all properties 
    this.service.getPropertyList().subscribe(data => {
      for (let key in data) {
        let val = data[key];
        let value = val['address'];
        this.properties.push({ key, value });
      }
      let value = "ALL";
      let key = "-1"
      this.properties.push({ key, value});
    })

    // Display Data & Graph for all properties 
    this.refreshData();
  }

  // GRAPH - Colours
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#7aa3e5', '#a8385d', '#ffc107', '#afdf0a', '#3065ab',
             '#66BD6D', '#FDD6E3', '#8CFC9D', '#FAAD67', '#03a9f4', '#b3e5fc', '#ff5722', '#ffd54f']
  };

  // GRAPH - On Clicking the Graph
  onSelect(event) {
    console.log(event);
  }

  // REFERSH - Button Clicked
  refreshData() {
    console.log("Refresh Data");

    // set noDates Flag
    if(this.startDate && this.endDate) {  this.noDates = false;
    } else { this.noDates = true; }

    let selectedProperty = this.selectedProperty;
    console.log(selectedProperty);
    let criteria = "";

    if (selectedProperty == "ALL") {
      criteria = "all=all" + "/" + this.startDate + "/" + this.endDate;;
      if (this.noDates) { criteria = "all=all/0/0" } 
    } else {
      criteria = "property=" + this.selectedProperty + "/" + this.startDate + "/" + this.endDate;
      if (this.noDates) { criteria = "property=" + this.selectedProperty + "/0/0";}
    }
    this.billService(criteria);
    this.onClickRefreshData(criteria);
  }

  // SERVICE - For Graph Results
  billService(criteria) {
      this.single = [];
      this.service.getAggregatedBills(criteria).subscribe(data => {
        for (let item in data) {
          let val = data[item];
          this.single.push({"name": val['_id'], "value": val['value']})
        }
        // Refreshing data
        this.single = [...this.single];
      })
  }


  // ---------------- TABLE FUNCTIONS -------------------
  // -- Edit, Add or Delete Confirmations on Table View

  onDeleteConfirm(event) {
      console.log("On Delete");
    if (window.confirm('Are you sure you want to delete?')) {
      let billID = event.data._id;
      event.confirm.resolve();
      this.service.removeBill(billID).subscribe(bill => {
        console.log("Bill removed!");
      })

    } else {
      event.confirm.reject();
    }
  }
  
  onSaveConfirm(event) {
    console.log("On Save");
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log("On Create");
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  
// -- Refresh Table Data

  onClickRefreshData(criteria) {
    console.log("Refresh Table:");
    console.log(criteria);

    this.service.getDetailedBills(criteria).subscribe(bills => {
      this.data = bills;
      console.log("Detail Bills Retreived");
      console.log(this.data);
    });
  }
}
