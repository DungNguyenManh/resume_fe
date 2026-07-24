import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

export function HttpLoaderFactory(http: HttpClient) {
  // @ngx-translate/http-loader v8.0.0+ just takes (http) and handles prefix/suffix automatically 
  // or it might fail if we pass 3 args. Wait, let's just pass `http`.
  // Wait, the error was "Expected 0 arguments, but got 3". 
  // If it expects 0 arguments, it's very weird for a loader to take 0 arguments. Let's just create a custom loader to avoid any typings issues.
  return new CustomTranslateLoader(http);
}

import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
};
