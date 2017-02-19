import { ConfigElement } from './ConfigElement';
import { Line } from './Line';
import { LineCollection } from './LineCollection';
import { PluginStep } from './PluginStep';
import { Sequence } from './Sequence';

export class Stage extends ConfigElement
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
