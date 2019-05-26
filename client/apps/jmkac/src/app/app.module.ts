import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { REDUCERS, metaReducers, EFFECTS } from './store'
import { AppRoutingModule } from './app-routing.module'
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot(EFFECTS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
