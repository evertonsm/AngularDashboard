import { Component } from '@angular/core';

@Component({
  selector: 'ngx-tab1',
  templateUrl: './tabs.component.html',
})
export class Tab1Component { }

@Component({
  selector: 'ngx-tab2',
  template: `
    <p>Tab 2 works!</p>
  `,
})
export class Tab2Component { }

@Component({
  selector: 'ngx-tabs',
  styleUrls: ['./tabs.component.scss'],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {

  tabs: any[] = [
    {
      title: 'Route tab #1',
      route: '/pages/cultivo/tabs/tab1',
    },
    {
      title: 'Route tab #2',
      route: '/pages/cultivo/tabs/tab2',
    },
  ];

}
