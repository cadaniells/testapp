import { Injectable }       from '@angular/core';

import { DropdownQuestion } from '../dynamicForms/question-dropdown';
import { QuestionBase }     from '../dynamicForms/question-base';
import { TextboxQuestion }  from '../dynamicForms/question-textbox';
import { DateQuestion }     from '../dynamicForms/question-date';
import { RadioQuestion }     from '../dynamicForms/question-radio';

import { SummaryService }  from '../../service/summary.service';

import 'rxjs/add/operator/map';

@Injectable()
export class BillService {

  constructor(private service: SummaryService) { }

  allProperties: any = [];

  billCategories: any = [
          {key: 'water',  value: 'Water'},
          {key: 'council',  value: 'Council Rates'},
          {key: 'maintenance',  value: 'Maintenance'},
          {key: 'corp',  value: 'Body Corporate'},
          {key: 'emergency',  value: 'Emergency Levy'},
          {key: 'land',  value: 'Land Tax'},
          {key: 'advertising', value: 'Advertising for Tenancy'},
          {key: 'cleaning', value: 'Cleaning'},
          {key: 'insurance', value: 'House Insurance'},
          {key: 'interest', value: 'Loan Interest'},
          {key: 'repairs', value: 'Repairs & Maintenance'},
          {key: 'travel', value: 'Travel Expenses'},
          {key: 'other', value: 'Other Expenses'}
  ];

  frequency: any = [
        {key: 'once', value: 'Once Only'},
        {key: 'weekly', value: 'Weekly'},
        {key: 'fortnightly', value: 'Fortnightly'},
        {key: 'monthly', value: 'Monthly'},
        {key: 'quarterly', value: 'Quarterly'},
        {key: 'yearly', value: 'Yearly'}
  ];

  taxTypes: any =[
    {key: 'captialWorks', value: 'Capital Works'},
    {key: 'deducation', value: 'Deduction'},
    {key: 'maintenance', value: 'Repairs/Maintenance'}
  ];

  billQuestions: QuestionBase<any>[] = [];
  billInfoQuestions: QuestionBase<any>[] = [];

// --------------  ALL BILL QUESTIONS  --------------------

  getBillQuestions() {
    this.billQuestions = this.getBillInfoQuestions();
    return this.billQuestions; 
  };
  
  
// --------------  BILL INFO  --------------------

  getBillInfoQuestions() {

    this.service.getPropertyList().subscribe(property => {
      for (let key in property) {
        let val = property[key];
        let value = val['address'];
        let k = value;
        this.allProperties.push({ k, value });
      }
    });

    this.billInfoQuestions = [

      new DropdownQuestion({
        key: 'property',
        label: 'Property Name',
        required: true,
        options: this.allProperties,
        category: 'Details',
        order: 1
      }),

      new DropdownQuestion({
        key: 'category',
        label: 'Bill Category',
        required: true,
        options: this.billCategories,
        category: 'Details',
        order: 2
      }),

      new TextboxQuestion({
        key: 'company',
        label: 'Company Name',
        required: true,
        category: 'Details',
        order: 3
      }), 

      new TextboxQuestion({
        key: 'amount',
        label: 'Amount',
        required: true,
        type: Number,
        category: 'Details',
        order: 4
      }),

      new DateQuestion({
        key: 'dueDate',
        label: 'Due Date',
        required: true,
        type: 'date',
        category: 'Details',
        order: 5
      }),

      new DateQuestion({
        key: 'invoiceDate',
        label: 'Invoice Date',
        required: true,
        type: 'date',
        category: 'Details',
        order: 6
      }),

      new DropdownQuestion({
        key: 'taxType',
        label: 'Tax Type',
        required: true,
        type: 'downdown',
        options: this.taxTypes,
        category: 'Details',
        order: 7
      }),

      new DropdownQuestion({
        key: 'frequency',
        label: 'Frequency',
        required: true,
        type: 'dropdown',
        options: this.frequency,
        category: 'Details',
        order: 8
      })

    ];
    return this.billInfoQuestions.sort((a, b) => a.order - b.order);
  };

}
  
