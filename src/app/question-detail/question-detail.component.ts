import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
    moduleId: module.id,
    selector: 'question-detail',
    templateUrl: 'question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {
    q: {};
    questionId: number = 6414384;

    constructor(private questionService: QuestionService) {

    }

    ngOnInit() {
        this.questionService.getFullStackQuestionById(this.questionId).subscribe((qAndA) => {
            this.q = qAndA[0];
        });
    }
}