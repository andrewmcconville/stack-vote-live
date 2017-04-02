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
    private useStackOverflow: boolean = true;

    constructor(
        private angularFire: AngularFire,
        private http: Http
    ) { }

    /* Firebase */

    public getFirebaseQuestions(): FirebaseListObservable<QuestionGuess[]> {
        return this.angularFire.database.list('/guesses');
    };

    public getFirebaseQuestionByKey(key: string): FirebaseObjectObservable<QuestionGuess[]> {
        return this.angularFire.database.object(`/guesses/${key}`);
    };

    public setFirebaseQuestion(answerId: number, q: QuestionDetail): void {
        // some times stack users don't have these data, possibably deleted account?
        if (!q.owner.profile_image) { q.owner.profile_image = '../assets/default-avatar.png'; }
        if (!q.owner.reputation) { q.owner.reputation = 0; }

        this.angularFire.database.object(`/guesses/${q.question_id}`).set({
            answers: [{ [answerId]: 1 }],
            title: q.title,
            owner: {
                reputation: q.owner.reputation,
                profileImage: q.owner.profile_image,
                displayName: q.owner.display_name,
                link: q.link
            }
        });
    };

    public setFirebaseAnswer(answerId: number, answerIndex: number, questionId: number): void {
        this.angularFire.database.object(`/guesses/${questionId}/answers/${answerIndex}`).set({
            [answerId]: 1
        });
    };

    public updateFirebaseQuestion(questionId: number, answerIndex: number): void {
        this.angularFire.database.list('/guesses').update(questionId.toString(), {
            title: 'new title'
        });
    };

    public updateFirebaseAnswer(answerCount: number, answerId: number, answerIndex: number, questionId: number): void {
        this.angularFire.database.object(`/guesses/${questionId}/answers/${answerIndex}`).update({
            [answerId]: answerCount
        });
    };

    public deleteFirebaseQuestionById(key: number): void {
        this.angularFire.database.object(`/guesses/${key}`).remove();
    };

    public deleteAllFirebaseQuestions(): void {
        this.angularFire.database.list('/guesses').remove();
    };

    public isFirebaseQuestion(questionId: number): boolean {
        let existance: boolean;

        this.angularFire.database.object(`/guesses/${questionId}`).subscribe((object) => {
            existance = object.$exists();
        });

        return existance;
    };

    /* Stack Gets */

    public getNewestStackQuestions(): Observable<QuestionNewest[]> {
        return this.http
            .get(this.getNewestQuery())
            .map((response: Response) => response.json().items);
    };

    public getFullStackQuestionById(queryId: number): Observable<QuestionDetail[]> {
        return this.http
            .get(this.getFullQuery(queryId))
            .map((response: Response) => response.json().items);
    };

    /* Stack Queries */

    private getNewestQuery(): string {
        if (this.useStackOverflow) {
            return 'http://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=20&order=desc&sort=activity&accepted=True&answers=2&site=stackoverflow&filter=!*7PYVvGlC3ioZ2YD.1t9er8M4dtr';
        } else {
            return '/src/app/services/stack-newest-mock.json';
        }
    };

    private getFullQuery(queryId: number): string {
        if (this.useStackOverflow) {
            return `http://api.stackexchange.com//2.2/questions/${queryId}?order=desc&sort=activity&site=stackoverflow&filter=!E-NOqiG71BN9ADWkx7_t.c9XpMYubL-MTk3mCi`;
        } else {
            return '/src/app/services/stack-full-mock.json';
        }
    };
}
