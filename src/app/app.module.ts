import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';
import { AppRoutingModule } from './app-routing.module';

import { QuestionService } from './services/question.service';
import { DebugService } from './services/debug.service';

import { AppComponent } from './app.component';
import { GuessListComponent } from './question-guess/guess-list.component';
import { NewestListComponent } from './question-newest/newest-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessListComponent,
    QuestionDetailComponent,
    NewestListComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DebugService,
    QuestionService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
