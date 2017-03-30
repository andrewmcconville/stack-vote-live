import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { QuestionDetail } from '../question-detail/question-detail';
import { QuestionGuess } from '../question-guess/question-guess';
import { QuestionNewest } from '../question-newest/question-newest';

@Injectable()
export class QuestionService {
    private useStackOverflow: boolean = false;

    constructor(
        private af: AngularFire,
        private http: Http
    ) { }

    /* Firebase */

    public getFirebaseQuestions(): FirebaseListObservable<QuestionGuess[]> {
        return this.af.database.list('/guesses');
    }

    public getFirebaseQuestionByKey(key: string): FirebaseObjectObservable<any[]> {
        return this.af.database.object(`/guesses/${key}`);
    }

    public setFirebaseQuestion(answerId: number, q: QuestionDetail): void {
        this.af.database.object(`/guesses/${q.question_id}`).set({
            answers: [{ [answerId]: 1 }],
            title: q.title,
            owner: {
                reputation: q.owner.reputation,
                profileImage: q.owner.profile_image,
                displayName: q.owner.display_name,
                link: q.link
            }
        });
    }

    public setFirebaseAnswer(answerId: number, answerIndex: number, questionId: number): void {
        this.af.database.object(`/guesses/${questionId}/answers/${answerIndex}`).set({
            [answerId]: 1
        });
    }

    public updateFirebaseQuestion(questionId: number, answerIndex): void {
        this.af.database.list('/guesses').update(questionId.toString(), {
            title: 'new title'
        });
    }

    public updateFirebaseAnswer(answerCount: number, answerId: number, answerIndex: number, questionId: number): void {
        this.af.database.object(`/guesses/${questionId}/answers/${answerIndex}`).update({
            [answerId]: answerCount
        });
    }

    public deleteAllFirebaseQuestions(): void {
        this.af.database.list('/guesses').remove()
    }

    public isFirebaseQuestion(questionId: number): boolean {
        let existance: boolean;

        this.af.database.object(`/guesses/${questionId}`).subscribe((object) => {
            existance = object.$exists();
        });

        return existance
    }

    /* Stack Gets */

    public getNewestStackQuestions(): Observable<QuestionNewest[]> {
        return this.http
            .get(this.getNewestQuery())
            .map((response: Response) => response.json().items);
    }

    public getFullStackQuestionById(queryId: number): Observable<QuestionDetail[]> {
        return this.http
            .get(this.getFullQuery(queryId))
            .map((response: Response) => response.json().items);
    }

    /* Stack Queries */

    private getNewestQuery(): string {
        if (this.useStackOverflow) {
            return 'http://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=20&order=desc&sort=activity&accepted=True&answers=2&site=stackoverflow&filter=!*7PYVvGlC3ioZ2YD.1t9er8M4dtr'
        } else {
            return '/src/app/services/stack-newest-mock.json'
        }
    }

    private getFullQuery(queryId: number): string {
        if (this.useStackOverflow) {
            return `http://api.stackexchange.com//2.2/questions/${queryId}?order=desc&sort=activity&site=stackoverflow&filter=!E-NOqiG71BN9ADWkx7_t.c9XpMYubL-MTk3mCi`
        } else {
            return '/src/app/services/stack-full-mock.json'
        }
    }
}