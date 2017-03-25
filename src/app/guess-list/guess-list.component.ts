import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
    moduleId: module.id,
    selector: 'guess-list',
    templateUrl: 'guess-list.component.html'
})
export class GuessListComponent implements OnInit {
    questions: any;

    constructor(private questionService: QuestionService) {

    }

    ngOnInit() {
        this.questions = this.questionService.getGuesses();
    }
}