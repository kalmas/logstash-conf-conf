import { ConfConfig } from "./index";



const c = ConfConfig.newConf();
c.input.addPlugin('stdin')
    .set('string', 'bar')
    .set('number', 10)
    .set('object', {'foo': 'bar', 'bing': {'bang': {'bong': 3}}})
    .set('bool', true);

c.input.addPlugin('elastic');



console.log(c.toString(false));

