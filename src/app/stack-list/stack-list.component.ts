import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'stack-list',
    templateUrl: 'stack-list.component.html'
})
export class StackListComponent implements OnInit {
    questions: Observable<any>;
    
    constructor(private questionService: QuestionService) {

    }

    ngOnInit() {
        this.questions = this.questionService.getNewestStackQuestions();
    }
}