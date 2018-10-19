import { Component } from '@angular/core';

@Component({
  selector: 'ngx-security-cameras',
  styleUrls: ['./security-cameras.component.scss'],
  templateUrl: './security-cameras.component.html',
})
export class SecurityCamerasComponent {

  cameras: any[] = [{
    title: 'Camera #1',
    source: 'assets/images/camera1.jpg',
  }, {
    title: 'Camera #2',
    source: 'assets/images/camera2.jpg',
  },];

  selectedCamera: any = this.cameras[0];

  userMenu = [{
    title: 'Profile',
  }, {
    title: 'Sair',
  }];

  isSingleView = false;

  userIsAdm = false;
  
  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }

}
