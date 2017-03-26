import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SoQuestion } from '../questions-types/soquestion';
import { FbQuestion } from '../questions-types/fbquestion';

@Injectable()
export class QuestionService {
    useStackOverflow: boolean = false;

    constructor(
        private af: AngularFire,
        private http: Http
    ) { }

    getFirebaseQuestions(): FirebaseListObservable<any[]> {
        return this.af.database.list('/nest');
    }

    getNewestStackQuestions(): Observable<SoQuestion[]> {
        return this.http
            .get(this.getNewestQuery())
            .map((response: Response) => response.json().items);
    }

    getBatchStackQuestionsByIds(queryIds: string): Observable<SoQuestion[]> {
        return this.http
            .get(this.getBatchQuery(queryIds))
            .map((response: Response) => response.json().items);
    }

    getNewestQuery(): string {
        if(this.useStackOverflow) {
            return 'http://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=10&order=desc&sort=activity&accepted=True&answers=2&site=stackoverflow&filter=!*1SgQGDQ)5Y.lIuepUj09VlZ4y)max.5CM-rlGOA2&key=96KYrlU5uoaBkT4Y9Fc1rw(('
        } else {
            return '/src/app/services/stack-newest-mock.json'
        }
    }

    getBatchQuery(queryIds: string): string {
        if(this.useStackOverflow) {
            return `http://api.stackexchange.com/2.2/questions/${queryIds}?order=desc&sort=activity&site=stackoverflow&key=96KYrlU5uoaBkT4Y9Fc1rw((`
        } else {
            return '/src/app/services/stack-batch-mock.json'
        }
    }
}