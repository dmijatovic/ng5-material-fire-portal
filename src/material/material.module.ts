//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MatIconModule, MatTabsModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MatIconModule, MatTabsModule
    ],
    exports: [
        MatToolbarModule, MatIconModule, MatTabsModule
    ],
})
export class AppMateralModule { }