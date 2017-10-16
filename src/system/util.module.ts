//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//get environment for connection to server
import { environment as env } from '../environments/environment';

//material components 
import { MatProgressSpinnerModule, MatButtonModule } from '@angular/material';

/**
 * UTILITY components
 */

import { LoaderComponent } from './loader.component';

@NgModule({
   declarations: [
      LoaderComponent
   ],
   imports: [      
      CommonModule,
      MatButtonModule,
      MatProgressSpinnerModule      
   ],
   exports: [LoaderComponent]
})
export class SystemComponentsModule { }
