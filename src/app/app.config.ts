import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ngxRoutes, routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxRouteManagerModule } from 'ngx-route-manager';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    importProvidersFrom(NgxRouteManagerModule.forRoot(ngxRoutes)),
  ]
};
