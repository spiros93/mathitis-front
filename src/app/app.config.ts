import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import { routes } from './app.routes';
import { RowDetailService } from 'src/app/app.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationHandlerComponent} from './notification-handler/notification-handler.component';
import {LoginFormComponent} from './login-form/login-form.component';

export function tokenGetter(){
  return localStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    //importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      JwtModule.forRoot({
        config:{
          tokenGetter: tokenGetter,
        },
      })
    ), 
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    RowDetailService,
    MatSnackBar,
    NotificationHandlerComponent,
    LoginFormComponent
],
};
