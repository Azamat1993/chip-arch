import { Component } from '@angular/core';
import { TOOLS } from 'src/modules/enums/tools';
import { GateFactoryService } from 'src/modules/factories/gate-factory.service';
import { GenericGate } from 'src/modules/pieces/generic-gate';
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
    private readonly toolService: ToolService,
    private readonly toolMapService: ToolMapService,
    private readonly gateFactoryService: GateFactoryService,
  ) {
    toolService.setTool(toolMapService.get(TOOLS.HAND));
    gateFactoryService.create({
      width: 100,
      height: 50,
    }, GenericGate);
  }
}
