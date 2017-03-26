import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';

@Component({
    moduleId: module.id,
    selector: 'question-detail',
    templateUrl: 'question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {
    q: {};
    //questionId: number = 6414384;

    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService
    ) { }

    ngOnInit(): void {
        this.route
            .params
            .map(params => params['id'])
            .subscribe(id => {
                this.questionService.getFullStackQuestionById(id).subscribe((qAndA) => {
                    this.q = qAndA[0];
                });
            });


    }

    guess(question_id: number, answer_id: number) {
        this.questionService.setFirebaseQuestion(question_id, answer_id);
        console.log(`q: ${question_id} a: ${answer_id}`)
    }
}