import { Component, OnDestroy, Input} from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-temperature-0',
  styleUrls: ['./sensor.component.scss'],
  templateUrl: './sensor.component.html',
 
})
export class SensorComponent implements OnDestroy {


  @Input() sensor: any;
  buttonOff = false;
  

  /*
  temperature :Number;
  temperatureOff = false;
  temperatureMode = 'cool';

  humidity = 87;
  humidityOff = false;
  humidityMode = 'heat';
  */
  colors: any;
  themeSubscription: any;
  

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
    });
    
    
  }

  
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
