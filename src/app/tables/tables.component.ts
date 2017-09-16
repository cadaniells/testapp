import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../service/summary.service';

@Component({
  selector: 'app-tables',
  styles: [],
  templateUrl: './tables.component.html'
})
export class TablesComponent {
  data: any[] = [];
  constructor(private service: SummaryService) {}

// -- Table Config 
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
        editable: false
      },
      category: {
        title: 'Category'
      },
      company: {
        title: 'Company'
      },
      amount: {
        title: 'Amount'
      },
      dueDate: {
        title: 'Due Date'
      },
      taxType: {
        title: 'Tax Type'
      },
      frequency: {
        title: 'Frequency'
      }
    }
  };
  
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

  onClickRefreshData() {
    this.service.getBills().subscribe(bills => {
      this.data = bills;
      console.log("Get BIlls");
      console.log(this.data);
    });
  }

  
}