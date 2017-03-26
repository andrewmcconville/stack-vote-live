import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class QuestionService {
    mockStack: boolean = true;

    constructor(
        private af: AngularFire,
        private http: Http
    ) { }

    getFirebaseQuestions(): FirebaseListObservable<any[]> {
        return this.af.database.list('/nest');
    }

    getBatchStackQuestionsByIds(q: string): Observable<any[]> {
        return this.http
            .get(this.getBatchQuery(q))
            .map((response: Response) => response.json().items);
    }

    getNewestStackQuestions(): Observable<any[]> {
        return this.http
            .get(this.getNewestQuery())
            .map((response: Response) => response.json().items);
    }

    getBatchQuery(q: string): string {
        if(this.mockStack) {
            return '/src/app/services/stack-batch-mock.json'
        } else {
            return `http://api.stackexchange.com/2.2/questions/${q}?order=desc&sort=activity&site=stackoverflow&key=96KYrlU5uoaBkT4Y9Fc1rw((`
        }
    }

    getNewestQuery(): string {
        if(this.mockStack) {
            return '/src/app/services/stack-newest-mock.json'
        } else {
            return 'http://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=10&order=desc&sort=activity&accepted=True&answers=2&site=stackoverflow&filter=!*1SgQGDQ)5Y.lIuepUj09VlZ4y)max.5CM-rlGOA2&key=96KYrlU5uoaBkT4Y9Fc1rw(('
        }
    }
}