import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class DebugService {
    debugButtons: boolean;

    constructor(private angularFire: AngularFire) {
        this.getDebugStatus();
    }

    getDebugStatus(): void {
        this.angularFire.database.object('/debug').subscribe(debug => {
            this.debugButtons = debug.$value
        });
    }

    toggleDebugMode(): void {
        this.angularFire.database.object('/debug').set(!this.debugButtons);
    }
}