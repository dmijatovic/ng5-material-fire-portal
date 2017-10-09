//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MatIconModule, MatTabsModule,
    MatInputModule, MatMenuModule, MatTooltipModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule
    ],
    exports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule
    ],
})
export class AppMateralModule { }