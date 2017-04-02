import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

import { QuestionService } from '../services/question.service';
import { DebugService } from '../services/debug.service';
import { QuestionNewest } from '../question-newest/question-newest';
import { QuestionGuess } from './question-guess';

@Component({
    moduleId: module.id,
    selector: 'guess-list',
    templateUrl: 'guess-list.component.html'
})
export class GuessListComponent implements OnInit {
    guessList: Array<QuestionGuess>;
    debugButtons: boolean = false;

    constructor(
        public debugService: DebugService,
        private questionService: QuestionService
    ) { }

    ngOnInit() {
        this.getQuestions();
    }

    private getQuestions() {
        this.questionService.getFirebaseQuestions().subscribe((questions: QuestionGuess[]) => {
            questions.forEach((question: QuestionGuess) => {
                // question.totalGuesses = question.answerCounts.reduce((a: number, b: number) => { return a + b });
            });
            this.guessList = questions;
        });
    };

    // deletes ALL questions in firebase
    private deleteAllGuesses() {
        this.questionService.deleteAllFirebaseQuestions();
    };

    // deletes this questions in firebase
    private deleteGuesses(key: number) {
        this.questionService.deleteFirebaseQuestionById(key);
    };
}
