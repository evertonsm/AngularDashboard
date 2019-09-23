import { Component } from '@angular/core';

@Component({
  selector: 'ngx-security-cameras',
  styleUrls: ['./security-cameras.component.scss'],
  templateUrl: './security-cameras.component.html',
})
export class SecurityCamerasComponent {

  cameras: any[] = [{
    title: 'Camera #1 - 5G',
    source: 'assets/images/camera1.jpg',
    cam1: true,
    
  },{
    title: 'Camera #2 - Padrão',
    source: 'assets/images/camera2.jpg',
    cam1: false,  
  },];

  selectedCamera: any = this.cameras[0];

  userMenu = [{
    title: 'Profile',
  }, {
    title: 'Sair',
  }];

  isSingleView = false;
  static userIsAdm = true;
  
  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;

  }

  getUserAdm(): boolean
  {
    return SecurityCamerasComponent.userIsAdm;
  }

}
