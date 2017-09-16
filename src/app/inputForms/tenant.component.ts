import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TenantService } from './dataservice/tenant.service';

@Component({
  selector: 'tenant-app',
  templateUrl: './tenant.component.html',
  providers:  [TenantService]
})
export class TenantComponent implements OnInit {
  questions: any[];
  formName: String = "Tenancy Application Form";

  constructor(private tenantService: TenantService) {}

  ngOnInit() {
    this.questions = this.tenantService.getTenancyAppQuestions();
  }
}
