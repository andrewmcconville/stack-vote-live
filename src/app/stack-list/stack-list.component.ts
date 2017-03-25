import { Component, OnInit } from '@angular/core';
import { StackService } from '../services/stack.service';

@Component({
    moduleId: module.id,
    selector: 'stack-list',
    templateUrl: 'stack-list.component.html'
})
export class StackListComponent implements OnInit {
    questions: any;
    
    constructor(private stackService: StackService) {

    }

    ngOnInit() {
        this.questions = this.stackService.getQuestionsByNewest();
    }
}