/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule, ToasterService } from '../../node_modules/angular2-toaster/angular2-toaster';
import { Station1Service } from './pages/garden/station1/station1.service';
import { Station2Service } from './pages/garden/station2/station2.service';

import { AuthGuard } from './auth-guard.service'
import { Station3Service } from './pages/garden/station3/station3.service';

import { LogService } from '../app/pages/log/log.service'


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToasterModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard,Station1Service, Station2Service, Station3Service, LogService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
