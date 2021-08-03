import { Component } from '@angular/core';
import { TOOLS } from 'src/modules/enums/tools';
import { GateFactoryService } from 'src/modules/factories/gate-factory.service';
import { SocketFactoryService } from 'src/modules/factories/socket-factory.service';
import { Point } from 'src/modules/models/point';
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
    private readonly socketFactoryService: SocketFactoryService,
  ) {
    this.toolService.setTool(this.toolMapService.get(TOOLS.HAND));
  }

  public createGate() {
    this.gateFactoryService.create({
      width: 100,
      height: 100,
    }, GenericGate);
  }

  public createSocket() {
    this.socketFactoryService.create({
      width: 10,
      height: 10,
    });
  }
}
