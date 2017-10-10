//angular 
import {NgModule} from '@angular/core';

//material modules components used in this project
//should go here
import {
    MatToolbarModule, MatIconModule, MatTabsModule,
    MatInputModule, MatMenuModule, MatTooltipModule,
    MatButtonModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule,
        MatButtonModule
    ],
    exports: [
        MatToolbarModule, MatIconModule, MatTabsModule,
        MatInputModule, MatMenuModule, MatTooltipModule,
        MatButtonModule
    ],
})
export class AppMateralModule { }