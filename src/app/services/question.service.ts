import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {
    //queryNewest: string = 'http://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=10&order=desc&sort=activity&accepted=True&answers=2&site=stackoverflow&filter=!*1SgQGDQ)5Y.lIuepUj09VlZ4y)max.5CM-rlGOA2&key=96KYrlU5uoaBkT4Y9Fc1rw((';
    queryNewest: string = '/src/app/services/stack-newest-mock.json';

    constructor(
        private af: AngularFire,
        private http: Http
    ) { }

    getNewest(): Observable<any[]> {
        return this.http
            .get(this.queryNewest)
            .map((response: Response) => response.json().items)
    }

    getGuesses(): FirebaseListObservable<any[]> {
        let firebaseQuestions: FirebaseListObservable<any[]> = this.af.database.list('/nest');

        /* put firebase results into a seprate array for merging with stack results */
        firebaseQuestions.subscribe((questions: Array<any>) => {

            /* map firebase observable into an array */
            let questionArray: Array<any> = questions.map((x: any) => x);

            /* merge question id's from firebase into string for stack query */
            let stackQuery: string = questions.map((x: any) => x.questionId).join(';');

            /* batch get stack questions who's ids are in firebase */
            //this.getBatchStackQuestionsByIds(stackQuery);
        })

        return firebaseQuestions
    }

    getBatchStackQuestionsByIds(q: string) {
        return this.http
            .get(`http://api.stackexchange.com/2.2/questions/${q}?order=desc&sort=activity&site=stackoverflow&key=96KYrlU5uoaBkT4Y9Fc1rw((`)
            .map((response: Response) => response.json().items)
            .subscribe((response: Response) => response)
    }
}