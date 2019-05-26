import { NgModule } from '@angular/core'
import { LoginPage } from './login.page';
import { AuthRoutingModule } from './routing';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule
    ],
    declarations: [
        LoginPage
    ]
})
export class Module {
    
}