import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService, Toast, BodyOutputType, ToasterModule, ToasterContainerComponent } from '../../../../node_modules/angular2-toaster/angular2-toaster';
import { Station } from '../garden/station1/station.model'
import { Station1Service } from '../garden/station1/station1.service'
import 'style-loader!angular2-toaster/toaster.css';
import { takeWhile } from '../../../../node_modules/rxjs/operators/takeWhile';
import { NbThemeService } from '../../../../node_modules/@nebular/theme';

@Component({
  selector: 'ngx-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})



export class LogComponent implements OnInit {

  stations: Station[];
  station_1: Station;
  station_2: Station;
  station_3: Station;
  data: any

  dao: Station1Service;

  private alive = true;
  statusCards: string;

  static userIsAdm = false;
  irrigation: boolean;
  init: boolean;
  

  constructor(private themeService: NbThemeService, private stationService: Station1Service, toasterService: ToasterService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
    
    this.data = "Ensley"
    this.dao = this.stationService;
    this.start()

    this.updateLog()

    this.toasterService = toasterService;

    setInterval(() => {
      this.updateLog()}, 5000);

  }

  start() {

    this.station_1 = new Station();
    this.station_2 = new Station();
    this.station_3 = new Station();

    this.station_1.irrigation = this.station_2.irrigation = this.station_3.irrigation = false;
    this.station_1.humidity = this.station_2.humidity = this.station_3.humidity = [0, 0, 0, 0];
  }


  updateLog() {
    this.dao.getStation("1").subscribe((res) => {
      this.stations = res;
      this.station_1.irrigation = this.stations[0].irrigation;
      this.station_1.humidity = this.stations[0].humidity;
    });
    this.stationService.getStation("2").subscribe((res) => {
      this.stations = res;
      this.station_2.irrigation = this.stations[0].irrigation;
      this.station_2.humidity = this.stations[0].humidity;
    });
    this.stationService.getStation("3").subscribe((res) => {
      this.stations = res;
      this.station_3.irrigation = this.stations[0].irrigation;
      this.station_3.humidity = this.stations[0].humidity;
    });
    //alert("Dados atualizados com sucesso!")
    //this.showToastInformations()
  }
  ngOnInit() {

  }

  //////// TOAST /////////
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
}
