import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';

import { QuestionService } from './services/question.service';

import { AppComponent } from './app.component';
import { GuessListComponent } from './guess-list/guess-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { StackListComponent } from './stack-list/stack-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessListComponent,
    QuestionDetailComponent,
    StackListComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
