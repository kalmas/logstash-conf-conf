import { ConfigElement } from './ConfigElement';

export class Line extends ConfigElement {
    constructor(private content: string = '', depth: number = 0) {
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

        str = str + this.content;

        if (pretty) {
            str = str + '\n';
        } else {
           str = str + ' ';
        }

        return str;
    }
}
