import { LogstashConf } from './src/LogstashConf';

class LogstashConfConfig {
    newConf(): LogstashConf {
        return new LogstashConf();
    }
}
const c = new LogstashConfConfig();

export { c as ConfConfig };
