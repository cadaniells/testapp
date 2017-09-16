import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormWizardModule } from 'angular2-wizard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { WizardComponent } from './wizard/wizard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SummaryComponent } from './summary/summary.component';
import { SummaryService } from './service/summary.service';
import { TenantComponent } from './inputForms/tenant.component';
import { OutgoingComponent } from './inputForms/outgoing.component';
import { DynamicFormComponent }         from './inputForms/dynamicForms/dynamic-form.component';
import { DynamicFormQuestionComponent } from './inputForms/dynamicForms/dynamic-form-question.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    WizardComponent,
    NotificationsComponent,
    SummaryComponent,
    TenantComponent,
    OutgoingComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule, 
    AppRoutingModule,
    LbdModule,
    HttpModule,
    Ng2SmartTableModule,
    FormWizardModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    ChartsModule
  ],
  providers: [SummaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
