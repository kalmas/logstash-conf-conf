import { ConfigElement } from './ConfigElement';
import { Line } from './Line';
import { LineCollection } from './LineCollection';

export class ConfigMap extends ConfigElement
{
    private map: Map<string, any> = new Map<string, any>();

    constructor(depth: number, map?: Object) {
        super(depth);

        if (typeof map !== 'undefined' && !Array.isArray(map)) {
            Object.keys(map).forEach(key => {
                this.set(key, map[key]);
            });
        }
    }

    set(key: string, value: any): ConfigMap {
        if (typeof value === 'object' && ! Array.isArray(value)) {
            value = new ConfigMap(this.nextDepth, value);
        }

        this.map.set(key, value);
        return this;
    }

    toLines(): LineCollection {
        let lines = new LineCollection();
        lines.push(new Line(`{`, this.depth));
        this.map.forEach((value: any, key: string) => {
            if (typeof value === 'number' || typeof value === 'boolean') {
                lines.push(new Line(`${key} => ${value}`, this.nextDepth));
            } else if (typeof value === 'string') {
                lines.push(new Line(`${key} => "${value}"`, this.nextDepth));
            } else if (Array.isArray(value)){
                lines.push(new Line(`${key} => ${JSON.stringify(value)}`, this.nextDepth));
            } else if (value instanceof ConfigMap) {
                lines.push(new Line(`${key} => {`, this.nextDepth));
                lines.pushAll(value.toLines().slice(1));
            }
        });
        lines.push(new Line(`}`, this.depth));
        return lines;
    }

    toString(pretty: boolean = true): string {
        return this.toLines().toString(pretty);
    }
}
