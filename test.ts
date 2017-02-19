import { expect } from 'chai';
import 'mocha';

import { ConfConfig } from './index';

function buildConf()  {
    const conf = ConfConfig.newConf();
    conf.input.addPlugin('stdin')
        .set('stringField', 'bar')
        .set('numberField', 10)
        .set('objectField', {'foo': 'bar', 'bing': {'bang': {'bong': 3}}})
        .set('arrayField', ['one', 'two', 'three'])
        .set('boolField', true);

    conf.input.addPlugin('elastic');

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
    elastic {
    }
}

filter {
}

output {
}`
        );
    });

    it('builds an unpretty string', () => {
        expect(buildConf().toString(false)).to.equal('input { stdin { stringField => "bar" numberField => 10 objectField => { foo => "bar" bing => { bang => { bong => 3 } } } arrayField => ["one","two","three"] boolField => true } elastic { } }  filter { }  output { }');
    });
});
