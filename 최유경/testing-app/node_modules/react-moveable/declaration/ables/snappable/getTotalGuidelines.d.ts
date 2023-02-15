import { MoveableManagerInterface, SnappableProps, SnappableState, SnapGuideline, SnapDirectionPoses, PosGuideline, ElementGuidelineValue, SnapElementRect } from "../../types";
export declare function getTotalGuidelines(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): SnapGuideline[];
export declare function getGapGuidelines(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, targetRect: SnapDirectionPoses, snapThreshold: number): SnapGuideline[];
export declare function getGridGuidelines(snapGridWidth: number, snapGridHeight: number, containerWidth: number, containerHeight: number, clientLeft?: number, clientTop?: number): SnapGuideline[];
export declare function checkBetweenRects(rect1: SnapDirectionPoses, rect2: SnapDirectionPoses, type: "horizontal" | "vertical", distance: number): boolean;
export declare function getElementGuidelines(moveable: MoveableManagerInterface<SnappableProps, SnappableState>): SnapGuideline[];
export declare function getDefaultGuidelines(horizontalGuidelines: Array<PosGuideline | number> | false, verticalGuidelines: Array<PosGuideline | number> | false, width: number, height: number, clientLeft?: number, clientTop?: number, snapOffset?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
}): SnapGuideline[];
export declare function getSnapElementRects(moveable: MoveableManagerInterface<SnappableProps, SnappableState>, values: ElementGuidelineValue[]): SnapElementRect[];
