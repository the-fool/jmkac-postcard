import { NgModule } from '@angular/core';
import { AdminPage } from './admin.page';
import { AdminRoutingModule } from './routing';

@NgModule({
    imports: [
        AdminRoutingModule
    ],
    declarations: [
        AdminPage
    ]
})
export class AdminModule {
}