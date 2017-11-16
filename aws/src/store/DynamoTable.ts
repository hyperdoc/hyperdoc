'use strict'

import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'

/**
 * DynamoDB table.
 */
export default class DynamoTable<T> {
  private params: any
  private mapper: Function

  /**
   * Constructor.
   * 
   * @param {any} params - Table parameters
   * @param {(obj: any) => T} mapper - Item mapper
   */
  constructor (params: any, mapper: (obj: any) => T) {
    this.params = params
    this.mapper = mapper
  }

  /**
   * Delete an item.
   * 
   * @param {{}} key - Item key
   * @return {Promise<T>} A promise that returns an empty object
   */
  delete (key: {}): Promise<T> {
    const documentClient = new AWS.DynamoDB.DocumentClient()

    // delete item and wrap response in a promise
    return new Promise((resolve, reject) => {
      documentClient.delete({
        TableName: this.params.tableName,
        Key: key
      }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(undefined)
        }
      })
    })
  }

  /**
   * Get an item.
   * 
   * @param {{}} key - Item key
   * @return {Promise<T>} A promise that returns the item object, or undefined if not found.
   */
  get (key: {}): Promise<T> {
    const self = this
    const documentClient = new AWS.DynamoDB.DocumentClient()

    // get item and wrap response in a promise
    return new Promise((resolve, reject) => {
      documentClient.get({
        TableName: this.params.tableName,
        Key: key
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(self.mapper && data.Item ? self.mapper(data.Item) : data.Item)
        }
      })
    })
  }

  /**
   * Create, or update, an item.
   * 
   * @param {{}} item - Item data
   * @return {Promise<T>} A promise that returns the saved item object.
   */
  put (item: {}): Promise<T> {
    const self = this
    const documentClient = new AWS.DynamoDB.DocumentClient()

    // put item and wrap response in a promise
    return new Promise((resolve, reject) => {
      documentClient.put({
        TableName: this.params.tableName,
        Item: item
      }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(self.mapper ? self.mapper(item) : item)
        }
      })
    })
  }
}
