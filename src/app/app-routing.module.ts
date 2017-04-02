import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDetailComponent } from './question-detail/question-detail.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/' },
    { path: 'question/:id', component: QuestionDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
