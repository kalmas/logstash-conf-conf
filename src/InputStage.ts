import { Stage } from './Stage';

export class InputStage extends Stage {
    static readonly beats = 'beats';
    static readonly couchdb_changes = 'couchdb_changes';
    static readonly elasticsearch = 'elasticsearch';
    static readonly file = 'file';
    static readonly gelf = 'gelf';
    static readonly generator = 'generator';
    static readonly graphite = 'graphite';
    static readonly heartbeat = 'heartbeat';
    static readonly http = 'http';
    static readonly http_poller = 'http_poller';
    static readonly jdbc = 'jdbc';
    static readonly kafka = 'kafka';
    static readonly log4j = 'log4j';
    static readonly rabbitmq = 'rabbitmq';
    static readonly redis = 'redis';
    static readonly s3 = 's3';
    static readonly sqs = 'sqs';
    static readonly stdin = 'stdin';
    static readonly syslog = 'syslog';
    static readonly tcp = 'tcp';
    static readonly twitter = 'twitter';
    static readonly udp = 'udp';
}
