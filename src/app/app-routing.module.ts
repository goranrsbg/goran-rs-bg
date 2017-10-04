import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeSamplesComponent } from './code-samples/code-samples.component';
import { CurriculumVitaeComponent } from './curriculum-vitae/curriculum-vitae.component';
import { CoverLetterComponent } from './cover-letter/cover-letter.component';
import { GateFormComponent } from './gate-form/gate-form.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { MainContentComponent } from './main-content/main-content.component';

import { MainGuard } from './main.guard';

const routes: Routes = [
    {
      path: 'typeKeyAndEnter',
      component: GateFormComponent,
      pathMatch: 'full'
    },
    {
      path: 'main',
      component: MainContentComponent,
      canActivate: [MainGuard],
      canLoad: [MainGuard],
      children: [
        {
          path: '',
          children: [
            {
              path: 'cover-letter',
              component: CoverLetterComponent,
              pathMatch: 'full'
            },
            {
              path: 'CV',
              component: CurriculumVitaeComponent,
              pathMatch: 'full'
            },
            {
              path: 'code-samples',
              component: CodeSamplesComponent,
              pathMatch: 'full'
            }
          ]
        }
      ]
    },
    {
      path: '',
      redirectTo: '/typeKeyAndEnter',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}