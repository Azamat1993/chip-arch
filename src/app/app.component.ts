import { Component } from '@angular/core';
import { TOOLS } from 'src/modules/enums/tools';
import { AreaDimensionService } from 'src/modules/services/area-dimension.service';
import { DragEventEmitterService } from 'src/modules/services/drag-event-emitter.service';
import { DragService } from 'src/modules/services/drag.service';
import { ToolMapService } from 'src/modules/services/tool-map.service';
import { ToolService } from 'src/modules/services/tool.service';
import { ZoomService } from 'src/modules/services/zoom.service';
import { HandToolService } from 'src/modules/tools/hand-tool.service';

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
    private readonly toolMapService: ToolMapService,
    private readonly handToolService: HandToolService,
  ) {
    toolService.setTool(toolMapService.get(TOOLS.HAND));
    areaDimensionService.currentDimension$.subscribe((a) => {
      console.log('the aaaa', a);
    });
  }
}
