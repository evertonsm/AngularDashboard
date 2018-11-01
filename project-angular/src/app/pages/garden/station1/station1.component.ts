import { Component, OnDestroy, OnInit } from '../../../../../node_modules/@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType, ToasterModule, ToasterContainerComponent } from '../../../../../node_modules/angular2-toaster/angular2-toaster';
import { takeWhile } from '../../../../../node_modules/rxjs/operators/takeWhile';
import { NbThemeService } from '../../../../../node_modules/@nebular/theme';
import { Station1Service } from './station1.service'
import { Station } from './station.model'

import 'style-loader!angular2-toaster/toaster.css';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  on: boolean;
}


@Component({
  moduleId: module.id,
  selector: 'ngx-station1',
  templateUrl: 'station1.component.html',
  styleUrls: ['./station1.component.scss'],
})
export class Station1Component implements OnDestroy, OnInit {

  private alive = true;
  statusCards: string;

  static userIsAdm = false;

  stations: Station[];
  irrigation: boolean;
  init: boolean;



  waterCard: CardSettings = {
    title: 'Acionar Irrigação',

    iconClass: 'nb-rainy',
    type: 'info',
    on: this.irrigation,
  };
  reloadCard: CardSettings = {

    title: 'Atualizar Informações',

    iconClass: 'ion-refresh',
    type: 'success',
    on: true,
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

  constructor(private themeService: NbThemeService, private station1Service: Station1Service, toasterService: ToasterService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];

      });
    this.toasterService = toasterService;

    this.refreshSensor()

  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
    //this.refreshSensor();

  }

  getStatusCard(title: string, adm: boolean): boolean {
    if (title == "Acionar Irrigação" && adm == false) {
      return false;
    }
    else {
      return true;
    }
  }

  getUserAdm(): boolean {
    return Station1Component.userIsAdm;
  }

  refreshSensor() {
    this.station1Service.getStation("1").subscribe((res) => {
      this.stations = res;
      this.irrigation = this.stations[0].irrigation;
      console.log('Ultimo estado encontrado! Bomba 1 = ' + this.irrigation)
      if (this.irrigation == true) {
        this.waterCard.on = true;

      } else {
        this.waterCard.on = false;

      }


      this.reciverFeedback(this.waterCard.on)

    });
  }


  reciverFeedback(res) {
    if (res == "Acionar Irrigação") {

      this.waterCard.on = !this.waterCard.on;
      if (this.waterCard.on == true) this.showToastWater();
      else
        this.showTurnOff();
      this.stations[0].irrigation = this.waterCard.on;
      console.log("Water card = " + this.waterCard.on)
      this.station1Service.setStation(this.stations[0]);
    }
    else if (res == "Atualizar Informações") {
      this.refreshSensor()
      this.showToastInformations();
      console.log('ATUALIZEI')
    }
    else if (res) {
      this.showToastInformations();
      this.stations[0].irrigation = true;
      console.log("Water card = " + this.waterCard.on)
    }
    else {
      this.stations[0].irrigation = false;
      console.log("Water card = " + this.waterCard.on)
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
  showTurnOff() {
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
      type: 'red',
      title: null,
      body: `Válvula de Irrigação Desligada`,
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
  /*
    countDownDate = 0;
    countDown = 0;
    
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