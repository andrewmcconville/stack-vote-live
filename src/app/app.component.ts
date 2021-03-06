import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { DebugService } from './services/debug.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(
        private debugService: DebugService,
        private titleService: Title
    ) {
        this.titleService.setTitle('Home');
    }

    toggleDebugMode() {
        this.debugService.toggleDebugMode();
    }
}
