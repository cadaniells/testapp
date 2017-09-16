import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { WizardComponent } from './wizard/wizard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SummaryComponent } from './summary/summary.component';
import { TenantComponent } from './inputForms/tenant.component';
import { OutgoingComponent } from './inputForms/outgoing.component';

const routes: Routes =[
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'wizard',         component: WizardComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'summary',        component: SummaryComponent },
    { path: 'outgoing',       component: OutgoingComponent },
    { path: 'tenant',         component: TenantComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
