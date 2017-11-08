'use strict'

import { HyperdocConfig } from 'hyperdoc-core/dist/config'

// default variables
const DEFAULT_ENV_VARIABLES = {
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
      'overriding', DEFAULT_ENV_VARIABLES[name])

    return process.env[name]
  }

  return DEFAULT_ENV_VARIABLES[name]
}

export interface DynamoTableConfig {
  tableName: string
}

export interface AwsConfig {
  profile: string
  region: string
  stage: string
  version: string
  prefix: string
  tables: {}
}

// Hyperdoc configuration
export interface HyperdocAwsConfig {
  aws: AwsConfig,
  hyperdoc: HyperdocConfig
}

export const Config: HyperdocAwsConfig = {
  aws: <AwsConfig> {
    profile: getVar('AWS_PROFILE'),
    region: getVar('AWS_REGION'),
    stage: getVar('ENVIRONMENT_STAGE'),
    version: getVar('PACKAGE_VERSION'),
    prefix: getVar('PROJECT_PREFIX'),
    tables: {
      node: <DynamoTableConfig> {
        tableName: getVar('TABLE_NODES_NAME')
      }
    }
  },
  hyperdoc: <HyperdocConfig> require('./hyperdoc.json')
}

// For local development, define these properties before requiring the SDK
// since it will provide the right credentials
if (!process.env.LAMBDA_TASK_ROOT) {
  // Code is not running in a Lambda container, set AWS profile to use
  process.env.AWS_PROFILE = Config.aws.profile
  process.env.AWS_REGION = Config.aws.region
}
