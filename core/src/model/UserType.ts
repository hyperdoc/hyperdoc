'use strict'

export default class UserType {
  public uuid: string
  public username: string

  constructor(uuid: string, username: string) {
    this.uuid = uuid
    this.username = username
  }

  /**
   * Convert to JSON.
   */
  toJSON () {
    return {
      uuid: this.uuid,
      username: this.username
    }
  }

  /**
   * Build a UserType instance from a JSON object.
   *
   * @param {Object} json - JSON
   */
  static fromJSON (json) {
    return new UserType(json.uuid, json.username)
  }
}