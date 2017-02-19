import { ConfigElement } from './ConfigElement';
import { LineCollection } from './LineCollection';

export abstract class Step extends ConfigElement {
    abstract toLines(): LineCollection;
}
