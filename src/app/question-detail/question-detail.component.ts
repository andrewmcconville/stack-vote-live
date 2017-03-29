import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { QuestionGuess } from '../question-guess/question-guess';
import { QuestionService } from '../services/question.service';

@Component({
    moduleId: module.id,
    selector: 'question-detail',
    templateUrl: 'question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {
    q: any;
    fb: any;

    constructor(
        private af: AngularFire,
        private route: ActivatedRoute,
        private router: Router,
        private questionService: QuestionService
    ) { }

    ngOnInit(): void {
        this.route.params.map((params: Params) => {
            return { id: params['id'], key: params['key'] }
        }).subscribe((params: Params) => {
            this.questionService.getFullStackQuestionById(params.id).subscribe((qAndA) => {
                this.q = qAndA[0];
            });
            this.questionService.getFirebaseQuestionByKey(params.id).subscribe((fbQuestion: Array<QuestionGuess>) => {
                this.fb = fbQuestion
            })
        });
    }

    guess(answer_id: number) {
        //answerCount++
        console.log(this.fb)
        let answerCount: number = 1;
        let answerId: number = answer_id;

        this.questionService.setFirebaseQuestion(answerCount, answerId, this.q.question_id, this.q.title);
    }

    update() {
        console.log(this.fb)
        this.af.database.list('/guesses').update(this.fb.$key.toString(), {
            answers: [
                { 2345235: 9 },
                { 8653568: 6 },
                { 65: 7 }
            ]
        });
    }
}