import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StackService } from './services/stack.service';
import { FirebaseService } from './services/firebase.service';

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
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    FirebaseService,
    StackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
