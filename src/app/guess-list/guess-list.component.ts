import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { SoQuestion } from '../questions-classes/soquestion';
import { FbQuestion } from '../questions-classes/fbquestion';

@Component({
    moduleId: module.id,
    selector: 'guess-list',
    templateUrl: 'guess-list.component.html'
})
export class GuessListComponent implements OnInit {
    guessList: Array<FbQuestion>;

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.getQuestions();
    }

    private getQuestions() {
        this.questionService.getFirebaseQuestions().subscribe((fbQuestions: Array<FbQuestion>) => {
            this.guessList = fbQuestions;
        })
    }

    // // double query, get question from firebase, then get question data from stack
    // private getQuestions() {
    //     //subscribe to firebase questions
    //     this.questionService.getFirebaseQuestions().subscribe((fbQuestions: Array<FbQuestion>) => {
    //         //map the firebase question id's to one big string seperated by a ; to query stack
    //         let stackQuery: string = fbQuestions.map((fbQuestion: FbQuestion) => fbQuestion.questionId).join(';');
    //         //if there are guesses
    //         if(stackQuery) {
    //             //subscribe to stack questions using the joined stackQuery string
    //             this.questionService.getBatchStackQuestionsByIds(stackQuery).subscribe((soQuestions: Array<SoQuestion>) => {
    //                 //merge the stack and firebase questions for the UI
    //                 this.guessList = this.mergeQuestions(fbQuestions, soQuestions)
    //             });
    //         }
    //     });
    // }

    private mergeQuestions(fbQuestions: Array<FbQuestion>, soQuestions: Array<SoQuestion>): Array<SoQuestion> {
        //for each stack question
        soQuestions.forEach((soQuestion: SoQuestion) => {
            //compare it to each firebase question
            fbQuestions.forEach((fbQuestion: FbQuestion) => {
                //if the question ids match
                if(soQuestion.question_id === fbQuestion.questionId) {
                    //sum up the count of all the firebase answers and put it on stack questions totalGuesses
                    soQuestion.totalGuesses = fbQuestion.answerCounts.reduce((a: number, b: number) => { return a + b });
                    //soQuestion.totalGuesses = fbQuestion.getTotalGuesses();
                    soQuestion.firebaseKey = fbQuestion.$key;
                }
            });
        });
        return soQuestions
    }

    private deleteAllGuesses() {
        // this.questionService.deleteAllGuesses();
        // this.guessList = null;
        console.log('this calls stack over and over, remember?');
    }
}