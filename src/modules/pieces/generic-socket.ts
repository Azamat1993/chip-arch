import { PIECE_TYPE } from "../enums/piece-type";
import { Generic } from "./generic";

export abstract class GenericSocket<T> extends Generic<T> {
    protected readonly type = PIECE_TYPE.SOCKET;
}