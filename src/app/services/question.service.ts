import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { QuestionNewest } from '../question-newest/question-newest';
import { QuestionGuess } from '../question-guess/question-guess';

@Injectable()
export class QuestionService {
    useStackOverflow: boolean = false;

    constructor(
        private router: Router,
        private af: AngularFire,
        private http: Http
    ) { }

    /* Firebase */

    getFirebaseQuestions(): FirebaseListObservable<QuestionGuess[]> {
        return this.af.database.list('/guesses');
    }

    getFirebaseQuestionByKey(key: string): FirebaseObjectObservable<any[]> {
        return this.af.database.object(`/guesses/${key}`);
    }

    setFirebaseQuestion(answerId: number, questionId: number, title: string): void {
        this.af.database.object(`/guesses/${questionId}`).set({
            answers: [ { [answerId]: 1 } ],
            title: title
        });
    }

    setFirebaseAnswer(answerId: number, answerIndex: number, questionId: number): void {
        this.af.database.object(`/guesses/${questionId}/answers/${answerIndex}`).set({
            [answerId]: 1
        });
    }

    updateFirebaseAnswer(answerCount: number, answerId: number, answerIndex: number, questionId: number): void {
        this.af.database.object(`/guesses/${questionId}/answers/${answerIndex}`).update({
            [answerId]: answerCount
        });
    }

    updateFirebaseQuestion(questionId: number, answerIndex): void {
        this.af.database.list('/guesses').update(questionId.toString(), {
            title: 'new title'
        });
    }

    deleteAllFirebaseQuestions(): void {
        this.af.database.list('/guesses').remove()
    }

    isFirebaseQuestion(questionId: number): boolean {
        let existance: boolean;

        this.af.database.object(`/guesses/${questionId}`).subscribe((object) => {
            existance = object.$exists();
        });

        return existance
    }

    /* Stack Gets */

    getNewestStackQuestions(): Observable<QuestionNewest[]> {
        return this.http
            .get(this.getNewestQuery())
            .map((response: Response) => response.json().items);
    }

    // getBatchStackQuestionsByIds(queryIds: string): Observable<SoQuestion[]> {
    //     return this.http
    //         .get(this.getBatchQuery(queryIds))
    //         .map((response: Response) => response.json().items);
    // }

    getFullStackQuestionById(queryId: number): Observable<QuestionNewest[]> {
        return this.http
            .get(this.getFullQuery(queryId))
            .map((response: Response) => response.json().items);
    }

    /* Stack Queries */

    private getNewestQuery(): string {
        if(this.useStackOverflow) {
            return 'http://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=10&order=desc&sort=activity&accepted=True&answers=2&site=stackoverflow&filter=!*7PYVvGlC3ioZ2YD.1t9er8M4dtr'
        } else {
            return '/src/app/services/stack-newest-mock.json'
        }
    }

    // private getBatchQuery(queryIds: string): string {
    //     if(this.useStackOverflow) {
    //         return `http://api.stackexchange.com/2.2/questions/${queryIds}?order=desc&sort=activity&site=stackoverflow&filter=!*7PYVvGlC3ioZ2YD.1t9er8M4dtr`
    //     } else {
    //         return '/src/app/services/stack-batch-mock.json'
    //     }
    // }

    private getFullQuery(queryId: number): string {
        if(this.useStackOverflow) {
            return `http://api.stackexchange.com//2.2/questions/${queryId}?order=desc&sort=activity&site=stackoverflow&filter=!E-NOqiG71BN9ADWkx7_t.c9XpMYubL-MTk3mCi`
        } else {
            return '/src/app/services/stack-full-mock.json'
        }
    }
}