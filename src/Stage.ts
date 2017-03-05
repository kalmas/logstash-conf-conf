import { ConfigElement } from './ConfigElement';
import { Line } from './Line';
import { LineCollection } from './LineCollection';
import { PluginStep } from './PluginStep';
import { Sequence } from './Sequence';
import { Step } from './Step';

export class Stage extends ConfigElement {
    private name: string;
    protected sequence: Sequence = new Sequence(this.nextDepth);

    constructor(name: string) {
        super(0);
        this.name = name;
    }

    addPlugin(id: string): PluginStep {
        return this.sequence.addPlugin(id);
    }

    getPlugin(pluginName: string): PluginStep {
        return this.sequence.getPlugin(pluginName);
    }

    getStep(index: number): Step {
        return this.sequence.getStep(index);
    }

    toLines(): LineCollection {
        const lines = new LineCollection();
        lines.push(new Line(`${this.name} {`, this.depth));
        lines.pushAll(this.sequence.toLines());
        lines.push(new Line('}', this.depth))

        return lines;
    }

    toString(pretty: boolean = true): string {
        return this.toLines().toString(pretty);
    }
}
