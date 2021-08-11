import { PIECE_TYPE } from "../enums/piece-type";
import { Point } from "../models/point";
import { Generic } from "./generic";

export abstract class GenericSocket<T> extends Generic<T> {
    protected readonly type = PIECE_TYPE.SOCKET;

    protected defaultWidth = 10;
    protected defaultHeight = 10;

    protected color = 'red';

    public move(diffPoint: Point): void {
        const { x, y } = this.moveInRange(this.getAlignedMove(diffPoint.x), this.getAlignedMove(diffPoint.y));

        if (x !== 0 || y !== 0) {
            const point = new Point(x, y);

            if (this.hasParent()) {
                const offsetPoint = this.position.add(point);
                
                if (this.isInside(offsetPoint, this.getParent())) {
                    this.moveInternal$.next(offsetPoint);
                }
            } else {
                this.moveInternal$.next(point);
            }
        }
    }

    protected moveInRange(x: number, y: number) {
        const parentPosition = this.parent.getPosition();
        const parentHeight = this.parent.getHeight();
        const parentWidth = this.parent.getWidth();

        let dx = 0;
        let dy = 0;
        
        if (this.position.y + this.height <= parentPosition.y || this.position.y >= parentPosition.y + parentHeight) {
            // can move horizontally

            const outerX = parentPosition.x - this.width;
            const outerWidth = parentWidth + this.width;

            if ((this.position.x + x) >= outerX && (this.position.x + x) <= outerX + outerWidth) {
                // move on x axis is in range
                dx += x;
            }
        }

        if (this.position.x + this.width <= parentPosition.x || this.position.x >= parentPosition.x + parentWidth) {
            // can move vertically

            const outerY = parentPosition.y - this.height;
            const outerHeight = parentHeight + this.height;

            if ((this.position.y + y) >= outerY && (this.position.y + y) <= outerY + outerHeight) {
                // move on y axis is in range
                dy += y;
            }
        }

        return {
            x: dx,
            y: dy,
        };
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