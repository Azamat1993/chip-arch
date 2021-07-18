import { Component } from '@angular/core';
import { DragEventEmitterService } from 'src/modules/services/drag-event-emitter.service';
import { DragService } from 'src/modules/services/drag.service';
import { ZoomService } from 'src/modules/services/zoom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chip-arch';

  constructor(private readonly dragService: DragService) {
    dragService.dragPos$.subscribe(a => {
      console.log('the a is', a);
    })
  }
}
