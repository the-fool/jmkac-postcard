import { NgModule } from '@angular/core';
import { AdminPage } from './admin.page';
import { AdminRoutingModule } from './routing';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        AngularFirestoreModule
    ],
    declarations: [
        AdminPage
    ]
})
export class AdminModule {
}