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
import { ListItemComponent, dv4List } from './dv4-list-item';

/**
 * UTILITY SERVICE
 */
//import {} from ''

@NgModule({
   declarations: [
      LoaderComponent,
      ListItemComponent,
      dv4List
   ],
   imports: [      
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatIconModule, MatInputModule
   ],
   providers:[],
   exports: [
      LoaderComponent,
      ListItemComponent,
      dv4List
   ]
})
export class SystemComponentsModule { }
