import { ConfigElement } from './ConfigElement';
import { LineCollection } from './LineCollection';
import { PluginStep } from './PluginStep';
import { Step } from './Step';

export class Sequence extends ConfigElement
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
