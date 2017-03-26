import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
    moduleId: module.id,
    selector: 'stack-list',
    templateUrl: 'stack-list.component.html'
})
export class StackListComponent implements OnInit {
    questions: any;
    
    constructor(private questionService: QuestionService) {

    }

    ngOnInit() {
        this.questions = this.questionService.getNewestStackQuestions();
    }
}