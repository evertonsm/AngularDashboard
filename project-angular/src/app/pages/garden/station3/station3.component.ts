import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType, ToasterModule, ToasterContainerComponent } from '../../../../../node_modules/angular2-toaster/angular2-toaster';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { NbThemeService } from '@nebular/theme';
import { Station3Service} from './station3.service'
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
  selector: 'ngx-station3',
  templateUrl: 'station3.component.html',
  styleUrls: ['./station3.component.scss'],
})
export class Station3Component implements OnDestroy, OnInit{

  private alive = true;
  statusCards: string;
  
  stations: Station[];
  irrigation = true;
  
  static userIsAdm = false;

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

  constructor(private themeService: NbThemeService, private station3Service: Station3Service, toasterService: ToasterService) {
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

  getStatusCard(title: string, adm: boolean): boolean
  {
    if(title == "Acionar Irrigação" && adm == false)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  getUserAdm():boolean
  {
    return Station3Component.userIsAdm;
  }

  refreshIrrigation(){
    this.station3Service.getIrrigation("3").subscribe((res)=>{
        this.stations = res;
        });
        
    }

    refreshSensor() {
      this.station3Service.getStation("3").subscribe((res) => {
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
        this.station3Service.setStation(this.stations[0]);
      }
      else if(res == "Atualizar Informações")
      {
        this.refreshSensor()
        this.showToastInformations();
        console.log('ATUALIZEI')
      }
      else {
        this.showToastInformations();
       
        //this.refreshSensor();
      }
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