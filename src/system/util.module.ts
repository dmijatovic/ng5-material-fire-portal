//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

//get environment for connection to server
import { environment as env } from '../environments/environment';

//material components 
import { MatProgressSpinnerModule, MatButtonModule,
   MatIconModule, MatInputModule
} from '@angular/material';

/**
 * UTILITY components
 */
import { LoaderComponent } from './loader.component';
import { ListItemComponent } from './dv4-list-item/dv4-list-item';


@NgModule({
   declarations: [
      LoaderComponent,
      ListItemComponent
   ],
   imports: [      
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatIconModule, MatInputModule
   ],
   exports: [
      LoaderComponent,
      ListItemComponent
   ]
})
export class SystemComponentsModule { }
