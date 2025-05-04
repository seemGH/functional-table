import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {providePrimeNG} from 'primeng/config';

import {routes} from './app.routes';
import {DefaultPreset} from '../assests/default-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: DefaultPreset,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      }
    })
  ]
};
