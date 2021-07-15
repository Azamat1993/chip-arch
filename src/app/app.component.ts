import { Component } from '@angular/core';
import { ZoomService } from 'src/modules/services/zoom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chip-arch';

  constructor(private readonly zoomService: ZoomService) {
    zoomService.currentZoom$.subscribe(a => {
      console.log('the a is', a);
    })
  }
}
