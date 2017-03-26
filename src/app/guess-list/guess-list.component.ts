import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { SoQuestion } from '../questions-types/soquestion';
import { FbQuestion } from '../questions-types/fbquestion';

@Component({
    moduleId: module.id,
    selector: 'guess-list',
    templateUrl: 'guess-list.component.html'
})
export class GuessListComponent implements OnInit {
    batch: Array<any>;

    constructor(private questionService: QuestionService) {

    }

    ngOnInit() {
        this.questionService.getFirebaseQuestions().subscribe((fbQuestions: Array<FbQuestion>) => {
            let stackQuery: string = fbQuestions.map((fbQuestion: FbQuestion) => fbQuestion.questionId).join(';');

            this.questionService.getBatchStackQuestionsByIds(stackQuery).subscribe((soQuestions: Array<SoQuestion>) => {

                this.batch = this.mergeQuestions(fbQuestions, soQuestions)
            });
        });
    }

    mergeQuestions(fbq: Array<FbQuestion>, soq: Array<SoQuestion>): Array<any> {
        console.log(fbq);
        console.log(soq);
        soq.map((soQuestion: SoQuestion) => {
            soQuestion.totalGuesses = 5;
        });

        return soq
    }
}