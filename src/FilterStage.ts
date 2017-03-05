import { Stage } from './Stage';

export class FilterStage extends Stage {
    static readonly aggregate = 'aggregate';
    static readonly anonymize = 'anonymize';
    static readonly csv = 'csv';
    static readonly date = 'date';
    static readonly de_dot = 'de_dot';
    static readonly dissect = 'dissect';
    static readonly dns = 'dns';
    static readonly drop = 'drop';
    static readonly fingerprint = 'fingerprint';
    static readonly geoip = 'geoip';
    static readonly grok = 'grok';
    static readonly json = 'json';
    static readonly kv = 'kv';
    static readonly mutate = 'mutate';
    static readonly ruby = 'ruby';
    static readonly sleep = 'sleep';
    static readonly split = 'split';
    static readonly throttle = 'throttle';
    static readonly syslog_pri = 'syslog_pri';
    static readonly translate = 'translate';
    static readonly urldecode = 'urldecode';
    static readonly useragent = 'useragent';
    static readonly uuid = 'uuid';
    static readonly xml = 'xml';
}
