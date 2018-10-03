import { Component, Input, EventEmitter, Output} from '@angular/core';

//import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: ` 
    
    <nb-card (click)="feedback()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>
    
      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
    
  `,
  
})

export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on: boolean;

  @Output() resClick = new EventEmitter();

  feedback() {
    this.resClick.emit(this.title);

  }
 
  
}
