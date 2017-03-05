import { Stage } from './Stage';

export class OutputStage extends Stage {
    static readonly csv = 'csv';
    static readonly elasticsearch = 'elasticsearch';
    static readonly email = 'email';
    static readonly file = 'file';
    static readonly graphite = 'graphite';
    static readonly http = 'http';
    static readonly kafka = 'kafka';
    static readonly rabbitmq = 'rabbitmq';
    static readonly redis = 'redis';
    static readonly s3 = 's3';
    static readonly stdout = 'stdout';
    static readonly tcp = 'tcp';
    static readonly udp = 'udp';
}
