import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';

import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  constructor() { }

  // Fields for Property Tenancy Application Form 
  getAllQuestions() {

    let allQuestions: QuestionBase<any>[] = [];

    allQuestions = this.getQuestions();
    allQuestions = allQuestions.concat(this.getReferenceQuestions());

    return allQuestions;

  }


  // ------- Tenancy: Reference Questions 

  getReferenceQuestions() {

    let referenceQuestions: QuestionBase<any>[] = [
        new TextboxQuestion({
        key: 'referenceName',
        label: 'Reference Name',
        required: true,
        category: 'References',
        order: 1
      }),
    ]

    return referenceQuestions.sort((a, b) => a.order - b.order);

  }


  // ------- Tenancy: Personal Questions 

  getQuestions() {

    let questions: QuestionBase<any>[] = [

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

    return questions.sort((a, b) => a.order - b.order);

  }
}