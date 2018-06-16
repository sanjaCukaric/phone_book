import { NgModule } from '@angular/core';
import {
    MatInputModule, MatCardModule,
    MatButtonModule, MatToolbarModule, MatExpansionModule, MatFormFieldModule
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatFormFieldModule

    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatFormFieldModule
    ]
})

export class AngularMaterialModule { }
