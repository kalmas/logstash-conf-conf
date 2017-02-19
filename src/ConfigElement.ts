export abstract class ConfigElement
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
