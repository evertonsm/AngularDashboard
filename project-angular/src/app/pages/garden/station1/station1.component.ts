import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType, ToasterModule, ToasterContainerComponent } from 'angular2-toaster';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { NbThemeService } from '@nebular/theme';
import { Station1Service} from './station1.service'
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
  selector: 'ngx-station1',
  templateUrl: 'station1.component.html',
  styleUrls: ['./station1.component.scss'],
})
export class Station1Component implements OnDestroy, OnInit{

  private alive = true;
  statusCards: string;
  
  stations: Station[];
  
  waterCard: CardSettings = {
    title: 'Water the garden',
    iconClass: 'nb-rainy',
    type: 'info',
    on : false,
  };
   reloadCard: CardSettings = {
    title: 'Reload informations',
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

  constructor(private themeService: NbThemeService, private station1Service: Station1Service, toasterService: ToasterService) {
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
  }

  
 refreshSensor(){
  this.station1Service.getStation("1").subscribe((res)=>{
        this.stations = res;
      });
  }


  reciverFeedback(res) {
    if(res == "Water the garden"){
        this.waterCard.on = !this.waterCard.on;
        if(this.waterCard.on == true)this.showToastWater();

    }
    else{
      this.showToastInformations();
      this.refreshSensor();
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
      body: `Updated informations`,
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
    body: `Water the garden`,
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
