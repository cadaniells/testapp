import { Injectable }       from '@angular/core';

import { DropdownQuestion } from '../dynamicForms/question-dropdown';
import { QuestionBase }     from '../dynamicForms/question-base';
import { TextboxQuestion }  from '../dynamicForms/question-textbox';

import { SummaryService }  from '../../service/summary.service';


import 'rxjs/add/operator/map';

@Injectable()
export class TenantService {

  constructor(private service: SummaryService) { }

  tenantAppQuestions: QuestionBase<any>[] = [];
  tenantPersonalQuestions: QuestionBase<any>[] = [];
  tenantReferenceQuestions: QuestionBase<any>[] = [];

// --------------  ALL TENANCY QUESTIONS  --------------------

  getTenancyAppQuestions() {
    this.tenantAppQuestions = this.getPersonalQuestions();
    this.tenantAppQuestions = this.tenantAppQuestions.concat(this.getReferenceQuestions());
    console.log(this.tenantAppQuestions);
    return this.tenantAppQuestions;
  };

// --------------  PERSONAL  --------------------

  getPersonalQuestions() {
    this.tenantPersonalQuestions = [
      new TextboxQuestion({
        key: 'firstName',
        label: 'First Name',
        required: true,
        category: 'TenantDetails',
        order: 1
      }),

      new TextboxQuestion({
        key: 'lastName',
        label: 'Last Name',
        required: true,
        category: 'TenantDetails',
        order: 2
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        category: 'TenantDetails',
        order: 3
      }),

      new DropdownQuestion({
        key: 'gender',
        label: 'Gender',
        required: true,
        options: [
          {key: 'male',  value: 'Male'},
          {key: 'female',  value: 'Female'}
        ],
        category: 'TenantDetails',
        order: 4
      })
    ];
    return this.tenantPersonalQuestions.sort((a, b) => a.order - b.order);
  };
  
// --------------  REFERENCES  --------------------

  getReferenceQuestions() {
    this.tenantReferenceQuestions = [
      new TextboxQuestion({
        key: 'referenceName',
        label: 'Reference Name',
        required: true,
        category: 'References',
        order: 1
      })
    ];
    return this.tenantReferenceQuestions.sort((a, b) => a.order - b.order);
  };

}
  
