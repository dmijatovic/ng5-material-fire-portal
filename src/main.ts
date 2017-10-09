import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//import { AppModule } from './app/app.module';
import { MainModule } from './main.module';

//import environment variables
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//import hammer js lib for touch devices
import 'hammerjs';

platformBrowserDynamic().bootstrapModule(MainModule)
  .catch(err => console.log(err));
