//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MatIconModule, MatTabsModule,
    MatInputModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule
    ],
    exports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule
    ],
})
export class AppMateralModule { }