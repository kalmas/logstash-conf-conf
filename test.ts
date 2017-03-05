import { expect } from 'chai';
import 'mocha';

import { ConfConfig, InputStage } from './index';

function buildConf()  {
    const conf = ConfConfig.newConf();
    conf.input.addPlugin(InputStage.stdin)
        .set('stringField', 'bar')
        .set('numberField', 10)
        .set('objectField', {'foo': 'bar', 'bing': {'bang': {'bong': 3}}})
        .set('arrayField', ['one', 'two', 'three'])
        .set('boolField', true);

    conf.input.addPlugin(InputStage.elasticsearch);

    return conf;
}

describe('ConfConfig', () => {
    it('builds a string', () => {

        expect(buildConf().toString()).to.equal(
`input {
    stdin {
        stringField => "bar"
        numberField => 10
        objectField => {
            foo => "bar"
            bing => {
                bang => {
                    bong => 3
                }
            }
        }
        arrayField => ["one","two","three"]
        boolField => true
    }
    elasticsearch {
    }
}

filter {
}

output {
}`
        );
    });

    it('builds an un-prettified string', () => {
        expect(buildConf().toString(false)).to.equal('input { stdin { stringField => "bar" numberField => 10 objectField => { foo => "bar" bing => { bang => { bong => 3 } } } arrayField => ["one","two","three"] boolField => true } elasticsearch { } }  filter { }  output { }');
    });
});

describe('Stage', () => {
    it('gets plugin by name', () => {
        const conf = buildConf();
        const esPlugin = conf.input.getPlugin(InputStage.elasticsearch);
        esPlugin.set('action', 'index');

        expect(conf.input.getPlugin(InputStage.elasticsearch).name).to.equal('elasticsearch');
    });

    it('gets non-existent plugin by name', () => {
        const conf = buildConf();
        expect(conf.input.getPlugin(InputStage.beats)).to.be.null;
    });

    it('gets plugin by index', () => {
        const conf = buildConf();
        expect(conf.input.getStep(1).name).to.equal('elasticsearch')
    });

    it('gets non-existent plugin by index', () => {
        const conf = buildConf();
        expect(conf.input.getStep(75)).to.be.null;
    });
});
