import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType, ToasterModule, ToasterContainerComponent } from 'angular2-toaster';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { NbThemeService } from '@nebular/theme';
import { Station2Service} from './station2.service'
import { Station} from './station.model'

import 'style-loader!angular2-toaster/toaster.css';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  on: boolean;
}


@Component({
  moduleId: module.id,
  selector: 'ngx-station2',
  templateUrl: 'station2.component.html',
  styleUrls: ['./station2.component.scss'],
})
export class Station2Component implements OnDestroy, OnInit{

  private alive = true;
  statusCards: string;
  
  stations: Station[];
  irrigation = true;
  
  waterCard: CardSettings = {
    title: 'Acionar Irrigação',
    iconClass: 'nb-rainy',
    type: 'info',
    on : this.irrigation,
  };
   reloadCard: CardSettings = {
    title: 'Atualizar Informações',
    iconClass: 'ion-refresh',
    type: 'success',
    on : true,
  };
    

  commonStatusCardsSet: CardSettings[] = [
    this.waterCard,
    this.reloadCard,
    
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    
  } = {
    default: this.commonStatusCardsSet,
    };

  constructor(private themeService: NbThemeService, private station2Service: Station2Service, toasterService: ToasterService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
        
    });
    this.toasterService = toasterService;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit(){
     this.refreshSensor();
     this.refreshIrrigation();
  }

  
  refreshIrrigation(){
    this.station2Service.getIrrigation("2").subscribe((res)=>{
        this.stations = res;
        });
        
    }

    refreshSensor() {
      this.station2Service.getStation("2").subscribe((res) => {
        this.stations = res;
        this.irrigation = this.stations[0].irrigation;
     
        if (this.irrigation == true) {
          this.waterCard.on = true;
          
        } else {
          this.waterCard.on = false;
         
        }
      
       
        this.reciverFeedback("Acionar irrigação")
  
      });
    }
  
  
    reciverFeedback(res) {
      if (res == "Acionar Irrigação") {

        this.waterCard.on = !this.waterCard.on;
        if (this.waterCard.on == true) this.showToastWater();
        this.stations[0].irrigation = this.waterCard.on;
        console.log("Water card = "+this.waterCard.on)
        this.station2Service.setStation(this.stations[0]);
      }
      else {
        this.showToastInformations();
       
        //this.refreshSensor();
      }


  //######################   TOASTER     #######################################
  
  config: ToasterConfig;
  private toasterService: ToasterService;
      popToast() {
      this.toasterService.pop('success', 'Args Title', 'Args Body');
  }

  showToastInformations() {
      this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 2000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'slideUp',
      limit: 3,
    });
    const toast: Toast = {
      type: 'success',
      title: null,
      body: `Informações Atualizadas`,
      timeout: 2000,
      showCloseButton: false,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  showToastWater() {
    this.config = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 2000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: true,
    animation: 'slideUp',
    limit: 3,
  });
  const toast: Toast = {
    type: 'info',
    title: null,
    body: `Válvula de Irrigação Acionada`,
    timeout: 2000,
    showCloseButton: false,
    bodyOutputType: BodyOutputType.TrustedHtml,
  };
  this.toasterService.popAsync(toast);
}

  clearToasts() {
    this.toasterService.clear();
  }

  //#################### BUTTON ###########

  countDownDate = 0;
  countDown = 0;
  /*
  getStatus(){
    if(this.title == "Reload informations"){
      this.on = !this.on;
      //this.showToast();
    }
    else{
              
      if(this.on == false)
        this.on = true;
    
      else{
        this.countDown = new Date().getSeconds();
       
        if(this.countDownDate+10 < this.countDown || this.countDownDate > this.countDown )
        {
          this.on = false;
          this.countDownDate = 0;
          this.countDown = 0;
        }
        if(this.countDownDate == 0)
          this.countDownDate = new Date().getSeconds();
                                       
      }
    }
  }*/
  
}