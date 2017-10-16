//angular 
import { NgModule } from '@angular/core';

//material modules components used in this project
//should go here
import {    
    MatToolbarModule, MatIconModule, MatTabsModule,
    MatInputModule, MatMenuModule, MatTooltipModule,
    MatButtonModule, MatExpansionModule, MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [  
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule,
        MatButtonModule, MatExpansionModule, MatSelectModule
    ],
    exports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule,
        MatButtonModule, MatExpansionModule, MatSelectModule
    ],
})
export class AppMateralModule { }