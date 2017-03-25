import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StackService {
    //query: string = 'http://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=10&order=desc&sort=activity&accepted=True&answers=2&site=stackoverflow&filter=!*1SgQGDQ)5Y.lIuepUj09VlZ4y)max.5CM-rlGOA2&key=96KYrlU5uoaBkT4Y9Fc1rw((';
    query: string = '/src/app/services/stack-newest-mock.json';

    constructor(private http: Http) {

    }

    getQuestionsByNewest() {
        return this.http
            .get(this.query)
            .map((response: Response) => response.json().items)
    }
}