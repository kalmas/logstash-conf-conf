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

    toString(pretty: boolean, baseDepth: number = 0) {
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
    protected array: Array<Line> = new Array();

    push(line: Line): number {
        return this.array.push(line);
    }

    pushAll(lines: LineCollection) {
        lines.array.forEach((line) => {
            this.array.push(line);
        });
    }

    toString(pretty: boolean): string {
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
    private _series: Series = new Series(this.nextDepth);

    constructor(private id: string) {
        super(0);
    }

    addStep(name: string): Step {
        return this._series.addStep(name);
    }

    toLines(): LineCollection {
        const lines = new LineCollection();
        lines.push(new Line(`${this.id} {`, this.depth));
        lines.pushAll(this._series.toLines());
        lines.push(new Line('}', this.depth))

        return lines;
    }

    toString(pretty: boolean): string {
        return this.toLines().toString(pretty);
    }
}

class Series extends ConfigElement
{
    private stack: Array<Step> = new Array();

    addStep(name: string): Step {
        const step = new Step(name, this.depth);
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

    toString(pretty: boolean): string {
        return this.toLines().toString(pretty);
    }
}

class Step extends ConfigElement
{
    private properties: Map<string, string> = new Map<string, string>();

    constructor(private name: string, depth: number) {
        super(depth);
    }

    set(key: string, value: any): Map<string, string> {
        return this.properties.set(key, value);
    }

    toLines(): LineCollection {
        let lines = new LineCollection();
        lines.push(new Line(`${this.name} {`, this.depth));

        this.properties.forEach((value: any, key: string) => {
            lines.push(new Line(`"${key}" => "${value}"`, this.nextDepth));
        });

        lines.push(new Line('}', this.depth));
        return lines;
    }

    toString(pretty: boolean): string {
        return this.toLines().toString(pretty);
    }
}



const s = new Stage('input');

s.addStep('stdin').set('foo', 'bar').set('bat', 'baz');

console.log(s.addStep('elastic').toString(true));


console.log(s.toString(true));
