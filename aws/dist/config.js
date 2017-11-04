'use strict';
const defaults = {
    AWS_PROFILE: 'default',
    AWS_REGION: 'eu-west-1',
    ENVIRONMENT_STAGE: 'development',
    PROJECT_PREFIX: 'hyperdoc-',
    PACKAGE_VERSION: '1.0.0',
    TABLE_NODES_NAME: 'nodes'
};
function getVar(name) {
    if (process.env[name]) {
        console.log('Getting value', name, 'from environmental variable with value', process.env[name], 'overriding', defaults[name]);
        return process.env[name];
    }
    return defaults[name];
}
const config = {
    aws: {
        profile: getVar('AWS_PROFILE'),
        region: getVar('AWS_REGION'),
        stage: getVar('ENVIRONMENT_STAGE'),
        version: getVar('PACKAGE_VERSION'),
        prefix: getVar('PROJECT_PREFIX'),
        tables: {
            node: {
                tableName: getVar('TABLE_NODES_NAME')
            }
        }
    },
    hyperdoc: {}
};
if (!process.env.LAMBDA_TASK_ROOT) {
    process.env.AWS_PROFILE = config.aws.profile;
    process.env.AWS_REGION = config.aws.region;
}
module.exports = config;
