import { Component } from '@angular/core';

/**
 * Generated class for the FpComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fp',
  templateUrl: 'fp.html'
})
export class FpComponent {

  text: string;

  constructor() {
    console.log('Hello FpComponent Component');
    this.text = 'Hello World';
  }

}
