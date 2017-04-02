import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QuestionDetail } from '../question-detail/question-detail';
import { QuestionGuess } from '../question-guess/question-guess';
import { QuestionService } from '../services/question.service';
import { DebugService } from '../services/debug.service';

@Component({
    moduleId: module.id,
    selector: 'question-detail',
    templateUrl: 'question-detail.component.html',
    styleUrls: ['question-detail.scss']
})
export class QuestionDetailComponent implements OnInit {
    q: QuestionDetail;
    g: QuestionGuess;
    showResults: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public debugService: DebugService,
        private questionService: QuestionService,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.getQuestionByRouteParam();
        this.titleService.setTitle('Question')
    }

    private getQuestionByRouteParam(): void {
        this.route.params.map((params: Params) => {
            // get the question id
            return { id: params['id'] };
        }).subscribe((params: Params) => {
            // on new question reset result state
            this.showResults = false;
            // use the id to get a specific question
            this.questionService.getFullStackQuestionById(params.id).subscribe((questionDetail: Array<QuestionDetail>) => {
                this.q = questionDetail[0];

                // need .map here otherwise there was a type issue
                this.questionService.getFirebaseQuestionByKey(params.id).map(x => x).subscribe((questionGuess: QuestionGuess) => {
                    this.g = questionGuess;

                    // if the question has guesses
                    if (questionGuess.answers) {
                        // then for each stack answer
                        this.q.answers.forEach((answer) => {
                            // see if there's a matching guess
                            questionGuess.answers.forEach((x) => {
                                // if there is
                                if (answer.answer_id === +Object.keys(x)) {
                                    // add the number of guesses to the answer
                                    answer.guessCount = x[answer.answer_id];
                                }
                            });
                        });
                    }
                });
            });
        });
    }

    private guess(answer_id: number, q: QuestionDetail): void {
        // does this question already have guesses
        if (this.questionService.isFirebaseQuestion(q.question_id)) {
            this.update(answer_id, q.question_id);
        } else {
            this.set(answer_id, q);
        }
    }

    private set(answer_id: number, q: QuestionDetail): void {
        this.questionService.setFirebaseQuestion(answer_id, q);
    }

    private update(answer_id: number, question_id: number): void {
        // at which index is the answer we want to update
        const index: number = this.g.answers.map((answerId: number) => +Object.keys(answerId)).indexOf(answer_id);
        // if it's a new answer lets add it to the end of the answers array
        const last: number = this.g.answers.length;

        // if the answers exists add 1, else add it to the answers array
        if (index >= 0) {
            const count: number = this.g.answers[index][answer_id] + 1;
            this.questionService.updateFirebaseAnswer(count, answer_id, index, question_id);
        } else {
            this.questionService.setFirebaseAnswer(answer_id, last, question_id);
        }
    }
}
