import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
    moduleId: module.id,
    selector: 'guess-list',
    templateUrl: 'guess-list.component.html'
})
export class GuessListComponent implements OnInit {
    batch: any;

    constructor(private questionService: QuestionService) {

    }

    ngOnInit() {
        this.questionService.getFirebaseQuestions().subscribe(questions => {
            let stackQuery: string = questions.map((x: any) => x.questionId).join(';');
            this.batch = this.questionService.getBatchStackQuestionsByIds(stackQuery);
        });
    }
}