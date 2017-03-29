import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';

import { QuestionGuess } from '../question-guess/question-guess';
import { QuestionService } from '../services/question.service';

@Component({
    moduleId: module.id,
    selector: 'question-detail',
    templateUrl: 'question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {
    q: any;
    g: QuestionGuess;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private questionService: QuestionService
    ) { }

    ngOnInit(): void {
        this.route.params.map((params: Params) => {
            return { id: params['id'], key: params['key'] }
        }).subscribe((params: Params) => {
            this.questionService.getFullStackQuestionById(params.id).subscribe((questionDetail) => {
                this.q = questionDetail[0];
            });
            this.questionService.getFirebaseQuestionByKey(params.id).map(x => x).subscribe((questionGuess: QuestionGuess) => {
                this.g = questionGuess;
            })
        });
    }

    private guess(answer_id: number, question_id: number, title: string): void {
        if(this.questionService.isFirebaseQuestion(question_id)) {
            this.update(answer_id, question_id);
        } else {
            this.set(answer_id, question_id, title);
        }
    }

    private set(answer_id: number, question_id: number, title: string): void {
        this.questionService.setFirebaseQuestion(answer_id, question_id, title);
    }

    private update(answer_id: number, question_id: number): void {
        let index: number = this.g.answers.map((answerId: number) => +Object.keys(answerId)).indexOf(answer_id);
        let last: number = this.g.answers.length;
        
        if(index >= 0) {
            let count: number = this.g.answers[index][answer_id]++;
            this.questionService.updateFirebaseAnswer(count, answer_id, index, question_id);
        } else {
            this.questionService.setFirebaseAnswer(answer_id, last, question_id);
        }
    }

    firebase(): void {
        this.questionService.isFirebaseQuestion(this.q.question_id);
    }
}