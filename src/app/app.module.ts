import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GateFormComponent } from './gate-form/gate-form.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { CoverLetterComponent } from './cover-letter/cover-letter.component';
import { CurriculumVitaeComponent } from './curriculum-vitae/curriculum-vitae.component';
import { CodeSamplesComponent } from './code-samples/code-samples.component';
import { WellComeComponent } from './well-come/well-come.component';

import { VisitorService } from './services/visitor.service';
import { MainGuard } from './guards/main.guard';
import { KeyInterceptor } from './interceptor/main-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    GateFormComponent,
    LetterBoxComponent,
    PageNotFoundComponent,
    MainContentComponent,
    CoverLetterComponent,
    CurriculumVitaeComponent,
    CodeSamplesComponent,
    WellComeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    VisitorService,
    MainGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeyInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}