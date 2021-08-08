import { PIECE_TYPE } from "../enums/piece-type";
import { Point } from "../models/point";
import { Generic } from "./generic";

export abstract class GenericSocket<T> extends Generic<T> {
    protected readonly type = PIECE_TYPE.SOCKET;

    protected defaultWidth = 10;
    protected defaultHeight = 10;

    protected color = 'red';

    public move(diffPoint: Point): void {
        const movedX = this.getAlignedMove(diffPoint.x);
        const movedY = this.getAlignedMove(diffPoint.y);

        if (this.hasParent()) {
            const offsetPoint = this.position.add(diffPoint);
            
            if (this.isInside(offsetPoint, this.getParent())) {
                this.moveInternal$.next(offsetPoint);
            }
        } else {
            this.moveInternal$.next(diffPoint);
        }
    }

    protected canMoveHorizontally(x: number, y: number) {
        const parentPosition = this.parent.getPosition();

        let dx = 0;
        let dy = 0;
        
        if (this.position.y - this.height > parentPosition.y || this.position.y + this.parent.getHeight()) {

        }
        if (x < 0) {
            if (this.position.x - x < this.
        } else if (x > 0) {

        }


        if (parentPosition.y - this.height === this.position.y) {

        }
    }

    protected getAlignedMove(d: number) {
        if (d === 0) {
            return 0;
        }

        if (d >= 1) {
            return 1;
        }

        if (d <= 1) {
            return -1;
        }
    }
}