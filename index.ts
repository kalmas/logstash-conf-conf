import { LogstashConf } from './src/LogstashConf';
import { OutputStage } from './src/OutputStage';
import { FilterStage } from './src/FilterStage';
import { InputStage } from './src/InputStage';

class LogstashConfConfig {
    newConf(): LogstashConf {
        return new LogstashConf();
    }
}
const c = new LogstashConfConfig();

export { c as ConfConfig };
export { OutputStage, FilterStage, InputStage }
