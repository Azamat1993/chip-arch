import { Component } from '@angular/core';
import { AreaDimensionService } from 'src/modules/services/area-dimension.service';
import { DragEventEmitterService } from 'src/modules/services/drag-event-emitter.service';
import { DragService } from 'src/modules/services/drag.service';
import { ToolService } from 'src/modules/services/tool.service';
import { ZoomService } from 'src/modules/services/zoom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chip-arch';

  constructor(
    private readonly dragService: DragService,
    private readonly areaDimensionService: AreaDimensionService,
    private readonly toolService: ToolService,
    private readonly zoomService: ZoomService,
  ) {
    areaDimensionService.currentDimension$.subscribe((a) => {
      console.log('the aaaa', a);
    });
  }
}
