import { Component, Input, Output, EventEmitter, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() questions: QuestionBase<any>[];
  form: FormGroup;
  payLoad = '';
  categories: any[] = [];

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);

    this.questions.forEach(question => {
      if (this.categories.indexOf(question.category) <= -1) {
        // not in array
        this.categories.push(question.category)
      };
    });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

  sendNotification() {
    this.notifyParent.emit(JSON.stringify(this.form.value))
  }
}