//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MdIconModule, MdTabsModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MdIconModule, MdTabsModule
    ],
    exports: [
        MatToolbarModule, MdIconModule, MdTabsModule
    ],
})
export class AppMateralModule { }