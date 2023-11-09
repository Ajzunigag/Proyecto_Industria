import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((registrationError) => {
      console.error('ServiceWorker registration failed: ', registrationError)
    })
  })
}

//navigator.serviceWorker.register('/service-worker.js')



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


