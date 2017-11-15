'use strict'

export default class Session {
  public userId: string
  
  /**
   * Constructor.
   * 
   * @param {string} userId - User ID
   */
  constructor (userId: string) {
    this.userId = userId
  }
}
