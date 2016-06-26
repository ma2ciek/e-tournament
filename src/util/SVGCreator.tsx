import { Point } from './common';
import * as React from 'react';

interface ITextInRectOptions {
    bg: string;
    borderRadius: number;
    borderWidth: number;
    centerX: number;
    centerY: number;
    color: string;
    height: number;
    text: string;
    width: number;
}

export default class SVGCreator {
    public static createLineBetweenPoints(p1: Point, p2: Point) {
        return 'M' + p1.x + ' ' + p1.y +
            'L' + p2.x + ' ' + p2.y + ' Z';
    }

    public static createTextInRect(options: ITextInRectOptions) {
        return <g>
            <rect
                x = {options.centerX - options.width / 2}
                y = {options.centerY}
                width = {options.width}
                height = {options.height}
                stroke = {options.color}
                strokeWidth = {options.borderWidth}
                fill = {options.bg}
                rx = {options.borderRadius}
                ry = {options.borderRadius}
                />
            <text
                textAnchor='middle'
                dominantBaseline='middle'
                fill={options.color}
                x = {options.centerX}
                y = {options.centerY + options.height / 2}>
                {options.text}
            </text>
        </g>;
    }
}
