//angular 
import { NgModule } from '@angular/core';

//material modules components used in this project
//should go here
import {    
    MatToolbarModule, MatIconModule, MatTabsModule,
    MatInputModule, MatMenuModule, MatTooltipModule,
    MatButtonModule, MatExpansionModule, MatSelectModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [  
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule,
        MatButtonModule, MatExpansionModule, MatSelectModule,
        MatSnackBarModule
    ],
    exports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule,
        MatButtonModule, MatExpansionModule, MatSelectModule,
        MatSnackBarModule
    ],
})
export class AppMateralModule { }