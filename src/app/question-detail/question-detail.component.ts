import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';

import { FbQuestion } from '../questions-classes/fbquestion';
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
            this.questionService.getFirebaseQuestionByKey(params.key).subscribe((fbQuestion: Array<FbQuestion>) => {
                this.fb = fbQuestion
            })
        });
    }

    guess(question_id: number, answer_id: number, title: string) {
        this.questionService.setFirebaseQuestion(question_id, answer_id, title);
        //this.router.navigate(['/question', this.q.question_id, this.fb.$key]);
    }
}