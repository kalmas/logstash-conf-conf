import { Line } from './Line';

export class LineCollection {
    private array: Array<Line> = new Array();

    constructor(array?: Array<Line>) {
        if (typeof array !== 'undefined') {
            this.array = array;
        }
    }

    slice(start?: number, end?: number): LineCollection {
        return new LineCollection(this.array.slice(start, end));
    }

    push(line: Line): number {
        return this.array.push(line);
    }

    pushAll(lines: LineCollection) {
        lines.array.forEach((line) => {
            this.array.push(line);
        });
    }

    toString(pretty: boolean = true): string {
        if (this.array.length == 0) return null;

        const baseDepth = this.array[0].depth;

        let str = '';
        this.array.forEach(l => {
            str = str + l.toString(pretty, baseDepth);
        });

        return str;
    }
}
