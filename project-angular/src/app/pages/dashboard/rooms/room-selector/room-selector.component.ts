import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ngx-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.scss'],
})
export class RoomSelectorComponent {
  @Output() select: EventEmitter<number> = new EventEmitter();
  
  selectedRoom: 'null';
  sortedRooms = [];
  viewBox = '20 0 450 400';
  isIE = !!(navigator.userAgent.match(/Trident/)
            || navigator.userAgent.match(/MSIE/)
            || navigator.userAgent.match(/Edge/));
  isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
  roomSvg = {
       
    rooms: [
      {
        id: '0',
        name: { text: 'Station #1', x: 80, y: 140 },
        area: { d: 'M 30 30 H 130 V 260 H 30 L 30 30' },
        border: {  d: 'M 30 30 H 130 V 260 H 30 L 30 30' },
      },
     
      {
        id: '2',
        name: { text: 'Station #2', x: 200, y: 140 },
        area: { d: 'M 150 30 H 250 V 260 H 150 L 150 30' },
        border: { d: 'M 150 30 H 250 V 260 H 150 L 150 30' },
      },

      {
        id: '3',
        name: { text: 'Station #3', x: 320, y: 140 },
        area: { d: 'M 270 30 H 370 V 260 H 270 L 270 30' },
        border: { d: 'M 270 30 H 370 V 260 H 270 L 270 30' },
      },

      {
        id: '4',
        name: { text: 'Reservoir', x: 200, y: 320 },
        area: { d: 'M 50 290 H 350 V 350 H 50 L 50 290' },
        border: { d: 'M 50 290 H 350 V 350 H 50 L 50 290' },
      },

    ],
  };

  constructor() {
    this.selectRoom('2');
  }

  private sortRooms() {
    this.sortedRooms = this.roomSvg.rooms.slice(0).sort((a, b) => {
      if (a.id === this.selectedRoom) {
        return 1;
      }
      if (b.id === this.selectedRoom) {
        return -1;
      }
      return 0;
    });
  }

  selectRoom(roomNumber) {
    this.select.emit(roomNumber);
    this.selectedRoom = roomNumber;
    this.sortRooms();
  }
}