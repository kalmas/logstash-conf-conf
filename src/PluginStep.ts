import { ConfigMap } from './ConfigMap';
import { Line } from './Line';
import { LineCollection } from './LineCollection';
import { Step } from './Step';

export class PluginStep extends Step {
    private properties: ConfigMap;
    private _pluginName: string;

    constructor(pluginName: string, depth: number) {
        super(depth);
        this._pluginName = pluginName;
        this.properties = new ConfigMap(depth);
    }

    get name() {
        return this._pluginName;
    }

    set(key: string, value: any) {
        return this.properties.set(key, value);
    }

    toLines() {
        const lines = new LineCollection();
        lines.push(new Line(`${this._pluginName} {`, this.depth));
        lines.pushAll(this.properties.toLines().slice(1));
        return lines;
    }

    toString(pretty: boolean = true) {
        return this.toLines().toString(pretty).trim();
    }
}
