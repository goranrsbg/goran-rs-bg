import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GateFormComponent } from './gate-form/gate-form.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';

@NgModule({
  declarations: [
    AppComponent,
    GateFormComponent,
    LetterBoxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
