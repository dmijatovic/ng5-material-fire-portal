//angular 
import { NgModule } from '@angular/core';

//material modules components used in this project
//should go here
import {    
    MatToolbarModule, MatIconModule, MatTabsModule,
    MatInputModule, MatMenuModule, MatTooltipModule,
    MatButtonModule, MatExpansionModule, MatSelectModule,
    MatSnackBarModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [  
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule,
        MatButtonModule, MatExpansionModule, MatSelectModule,
        MatSnackBarModule, MatProgressSpinnerModule
    ],
    exports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule,
        MatButtonModule, MatExpansionModule, MatSelectModule,
        MatSnackBarModule, MatProgressSpinnerModule
    ],
})
export class AppMateralModule { }