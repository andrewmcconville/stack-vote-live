import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'newest-list',
    templateUrl: 'newest-list.component.html'
})
export class NewestListComponent implements OnInit {
    questions: Observable<any>;
    
    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.questions = this.questionService.getNewestStackQuestions();
    }
}