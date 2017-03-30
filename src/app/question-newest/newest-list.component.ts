import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuestionService } from '../services/question.service';
import { QuestionNewest } from './question-newest'

@Component({
    moduleId: module.id,
    selector: 'newest-list',
    templateUrl: 'newest-list.component.html'
})
export class NewestListComponent implements OnInit {
    questions: Observable<QuestionNewest[]>;
    
    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.questions = this.questionService.getNewestStackQuestions();
    }
}