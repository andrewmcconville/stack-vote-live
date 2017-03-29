import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['app.component.scss']
})
export class AppComponent {
}
