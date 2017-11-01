'use strict'

// default variables
const defaults = {
  AWS_PROFILE: 'default',
  AWS_REGION: 'eu-west-1',
  ENVIRONMENT_STAGE: 'development',
  PROJECT_PREFIX: 'hyperdoc-',
  PACKAGE_VERSION: '1.0.0',
  TABLE_NODES_NAME: 'nodes'
}

/**
 * Read a variable value from the environment or defaults variables.
 * 
 * @param {string} name Variable name
 * @return {string} Variable value
 */
function getVar (name) {
  if (process.env[name]) {
    console.log('Getting value', name,
      'from environmental variable with value', process.env[name],
      'overriding', defaults[name])

    return process.env[name]
  }

  return defaults[name]
}

// Hyperdoc configuration
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
}

// For local development, define these properties before requiring the SDK
// since it will provide the right credentials
if (!process.env.LAMBDA_TASK_ROOT) {
  // Code is not running in a Lambda container, set AWS profile to use
  process.env.AWS_PROFILE = config.AWS_PROFILE
  process.env.AWS_REGION = config.AWS_REGION
}

module.exports = config
