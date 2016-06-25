import { Point } from './common';

export default class SVGCreator {
    public static createLineBetweenPoints(p1: Point, p2: Point) {
        return 'M' + p1.x + ' ' + p1.y +
            'L' + p2.x + ' ' + p2.y + ' Z';
    }
}
