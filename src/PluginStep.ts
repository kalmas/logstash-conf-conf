import { ConfigMap } from './ConfigMap';
import { Line } from './Line';
import { LineCollection } from './LineCollection';
import { Step } from './Step';

export class PluginStep extends Step
{
    private properties: ConfigMap;
    private id: string;

    constructor(id: string, depth: number) {
        super(depth);
        this.id = id;
        this.properties = new ConfigMap(depth);
    }

    set(key: string, value: any): ConfigMap {
        return this.properties.set(key, value);
    }

    toLines(): LineCollection {
        const lines = new LineCollection();
        lines.push(new Line(`${this.id} {`, this.depth));
        lines.pushAll(this.properties.toLines().slice(1));
        return lines;
    }

    toString(pretty: boolean = true): string {
        return this.toLines().toString(pretty);
    }
}
