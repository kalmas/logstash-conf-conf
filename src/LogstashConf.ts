import { Line } from './Line';
import { LineCollection } from './LineCollection';
import { Stage } from './Stage';

export class LogstashConf {
    private _input: Stage = new Stage('input');
    private _filter: Stage = new Stage('filter');
    private _output: Stage = new Stage('output');

    get input(): Stage {
        return this._input;
    }

    get filter(): Stage {
        return this._filter;
    }

    get output(): Stage {
        return this._output;
    }

    toLines(): LineCollection {
        const lines = new LineCollection();
        lines.pushAll(this._input.toLines());
        lines.push(new Line());
        lines.pushAll(this._filter.toLines());
        lines.push(new Line());
        lines.pushAll(this._output.toLines());
        return lines;
    }

    toString(pretty: boolean = true): string {
        return this.toLines().toString(pretty).trim();
    }
}
