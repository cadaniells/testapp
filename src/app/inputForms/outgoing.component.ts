import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BillService } from './dataservice/bill.service';
import { SummaryService } from '../service/summary.service';

@Component({
  selector: 'outgoing-app',
  templateUrl: './outgoing.component.html',
  providers:  [BillService]
})
export class OutgoingComponent implements OnInit { 
    questions: any[] = [];
    formName: String = "New Property Bill or Expense";
    fields: any[] = [];

    constructor(private service: BillService, private apiService: SummaryService) {}


    ngOnInit() {
        this.questions = this.service.getBillQuestions();
    };

    getNotification(evt) {
        console.log(evt)
        console.log("Notified in Parent");
        this.apiService.insertBill(evt).subscribe(bill => {
            console.log("Bill Service Done");
        })
        console.log("Complete!");
    }
}

