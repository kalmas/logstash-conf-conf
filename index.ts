abstract class ConfigElement
{
    constructor(private _depth: number) {};

    get nextDepth(): number {
        return this._depth + 1;
    }

    get depth(): number {
        return this._depth;
    }

    abstract toString(pretty: boolean): string;
}

class Line extends ConfigElement
{
    constructor(private string: string, depth: number) {
        super(depth);
    }

    toString(pretty: boolean = true, baseDepth: number = 0) {
        const workingDepth = this.depth - baseDepth;
        let str = '';

        if (pretty) {
            for (let x = 0; x < workingDepth; x ++) {
                str = str + '    ';
            }
        }

        str = str + this.string;

        if (pretty) {
            str = str + '\n';
        } else {
           str = str + ' ';
        }

        return str;
    }
}

class LineCollection
{
    private array: Array<Line> = new Array();

    constructor(array?: Array<Line>) {
        if (typeof array !== "undefined") {
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

class Stage extends ConfigElement
{
    private sequence: Sequence = new Sequence(this.nextDepth);

    constructor(private id: string) {
        super(0);
    }

    addPlugin(id: string): PluginStep {
        return this.sequence.addPlugin(id);
    }

    toLines(): LineCollection {
        const lines = new LineCollection();
        lines.push(new Line(`${this.id} {`, this.depth));
        lines.pushAll(this.sequence.toLines());
        lines.push(new Line('}', this.depth))

        return lines;
    }

    toString(pretty: boolean = true): string {
        return this.toLines().toString(pretty);
    }
}

class Sequence extends ConfigElement
{
    private stack: Array<Step> = new Array();

    addPlugin(id: string): PluginStep {
        const step = new PluginStep(id, this.depth);
        this.stack.push(step);

        return step;
    }

    toLines(): LineCollection {
        let lines = new LineCollection();
        for (let step of this.stack) {
            lines.pushAll(step.toLines());
        }
        return lines;
    }

    toString(pretty: boolean = true): string {
        return this.toLines().toString(pretty);
    }
}

class ConfigMap extends ConfigElement
{
    private map: Map<string, any> = new Map<string, any>();

    constructor(depth: number, map?: Object) {
        super(depth);

        if (typeof map !== "undefined") {
            const _map = new Map<string, any>();
            Object.keys(map).forEach(key => {
                _map.set(key, map[key]);
            });
            this.map = _map;
        }
    }

    set(key: string, value: any): ConfigMap {
        if (typeof value === 'object') {
            value = new ConfigMap(this.nextDepth, value);
        }

        this.map.set(key, value);
        return this;
    }

    toLines(): LineCollection {
        let lines = new LineCollection();
        lines.push(new Line(`{`, this.depth));
        this.map.forEach((value: any, key: string) => {
            if (typeof value === 'number') {
                lines.push(new Line(`${key} => ${value}`, this.nextDepth));
            } else if (typeof value === 'string') {
                lines.push(new Line(`${key} => "${value}"`, this.nextDepth));
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

abstract class Step extends ConfigElement {
    abstract toLines(): LineCollection;
}

class PluginStep extends Step
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
        let lines = new LineCollection();
        lines.push(new Line(`${this.id} `, this.depth));
        lines.pushAll(this.properties.toLines());
        return lines;
    }

    toString(pretty: boolean = true): string {
        return this.toLines().toString(pretty);
    }
}



const s = new Stage('input');

s.addPlugin('stdin').set('foo', 'bar').set('bar', 10).set('baz', {'ing': 'aaaaa', 'woah': {'its': '2 deep'}});

console.log(s.addPlugin('elastic').toString());


console.log(s.toString());
