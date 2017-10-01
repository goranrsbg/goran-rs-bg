import { CodeSamplesComponent } from './../code-samples/code-samples.component';
import { CurriculumVitaeComponent } from './../curriculum-vitae/curriculum-vitae.component';
import { CoverLetterComponent } from './../cover-letter/cover-letter.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
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
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainContentRoutingModule {}