import { QuestionBase } from './question-base';

export class DateQuestion extends QuestionBase<string> {
  controlType = 'date';
  type: Date;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}