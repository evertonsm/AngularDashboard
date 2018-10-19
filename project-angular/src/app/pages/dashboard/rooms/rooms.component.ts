import { Component, HostBinding, OnDestroy, Input } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { getCreationMode } from '@angular/core/src/render3/instructions';
import { RoomSelectorComponent} from './room-selector/room-selector.component';

@Component({
  selector: 'ngx-rooms',
  styleUrls: ['./rooms.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.sm ? 'large' : 'medium'">
      <i (click)="collapse()" class="nb-arrow-down collapse" [hidden]="isCollapsed()"></i>
      <ngx-room-selector (select)="select($event)"></ngx-room-selector>
      <ngx-chartjs-bar-horizontal [stationName]="stationName" ></ngx-chartjs-bar-horizontal>
      <!-- <ngx-player [collapsed]="isCollapsed() && breakpoint.width <= breakpoints.md"></ngx-player> -->
    </nb-card>
    
  `,
})
export class RoomsComponent implements OnDestroy {

  @HostBinding('class.expanded')
  private expanded: boolean;
  private selected: number;

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  stationName : any;
  

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
      this.select('2');
  }

  select(roomNumber) {
    if (this.isSelected(roomNumber)) {
      this.expand();
    } else {
      this.collapse();
    }

    if(roomNumber == 1){
      this.stationName = 'Alface';
    }
    else{
      if(roomNumber == 2){
        this.stationName = 'Couve';
      }
      else{
        if(roomNumber == 3){
          this.stationName = 'Rúcula';
        }    
    
        else{
          this.stationName = 'Reservatório';
        }
      }
    }   
    this.selected = roomNumber;
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  isCollapsed() {
    return !this.expanded;
  }

  private isSelected(roomNumber): boolean {
    return this.selected === roomNumber;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
