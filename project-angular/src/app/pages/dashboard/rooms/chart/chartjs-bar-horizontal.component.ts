import { Component, OnDestroy, Input, OnInit, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Station1Service} from '../../../garden/station1/station1.service'
import { Station} from '../../../garden/station1/station.model'

@Component({
  selector: 'ngx-chartjs-bar-horizontal',
  styleUrls: ['./chartjs-bar-horizontal.component.scss'],
  template: `
    <div class="header">
      <span class="title">Canteiro Selecionado: </span>
        <h3>{{stationName}}</h3>
    </div>
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarHorizontalComponent implements OnDestroy, OnChanges, OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  @Input() stationName: string;
  
  station: Station[];
  public humidity = 0.0;
  
  constructor(private theme: NbThemeService, private station1Service: Station1Service) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }


  getValuesStation(station: string){
    var st;
    console.log(station)
    
    if(this.stationName == "Couve") st = "1";
    if(this.stationName == "Rúcula") st = "2";
    if(this.stationName == "Alface") st = "3";
    if(this.stationName == "Reservatório") st = "4";
        
    this.station1Service.getStation(st).subscribe((res)=>{
          
          this.station = res;
          var x;
          this.humidity = 0.0;
          if(this.station[0] != null){
            for(x in this.station[0].humidity){
              
              this.humidity += this.station[0].humidity[x];          
            } 
            x++;
            this.humidity = this.humidity/x;
            x = 0;
          }

          if(st == 2) console.log('Humidity = '+this.humidity)
          
          if(st!= 4) this.stationSelected(this.humidity, 0)

          else this.stationSelected(this.humidity, 1)
                
          
     });
     
  }


  stationSelected(humidity, tp){
    if(tp == 0){
      this.data = {
        labels: ['Umidade'],
        datasets: [{
            label: 'Média',
            
            backgroundColor: "#00f9a6",
            //backgroundColor: colors.infoLight,
            borderWidth: 2,
            data: [humidity*100/80, 0],
          },
        ],
      };      
    }
    
    else{

      this.data = {
        labels: ['Capacidade'],
        datasets: [{
            label: 'Max',
            backgroundColor: "#00f9a6",
            //backgroundColor: colors.infoLight,
            borderWidth: 2,
            data: [100, 10],
          },
        ],
      };      
    }

  }


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  ngOnChanges(){
      this.getValuesStation(this.stationName);
  }
  ngOnInit(){
    
  }

 
}
