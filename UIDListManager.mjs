import * as fs from "node:fs";
import { logger } from "./logger.mjs";
/**
 * Responsible for working with the list of users - saving, updating, and issuing data
 */
export class UIDListManager {
    #UIDListPath;
    #UIDList;

   /**
   * Returns an instance of the manager that works with the user list file at the specified path.
   * @param {string} UIDListPathStr file path
   */
  constructor(UIDListPathStr) {
    this.#UIDListPath = UIDListPathStr;
    if (!fs.existsSync(this.#UIDListPath)) {
      fs.closeSync(fs.openSync(this.#UIDListPath, 'w+'));
    };
    this.#UIDList = this.#getUpdateUIDList();
  }

  /**
   * Returns an array of user ids from a list file (or an empty array if there are no user UIDs)
   * @returns {Array.<string, number>}
   */
  #getUpdateUIDList() {
    let result = [];
    const data = fs.readFileSync(this.#UIDListPath);     
        if (data.length !== 0) {
          result = JSON.parse(data);
        } else {
          logger.addLogEntry(`WARN: received empty userId list`)
        }
        return result;
  }

  /**
   * return current list of uids (or an empty array if there are no user UIDs)
   * @returns  {Array.<string, number>}
   */
  getUIDList() {
    return this.#UIDList;
  }

  /**
   * checks if the user is in the list
   * @param {(number|string)} userId user chat id
   * @returns {boolean}
   */
  checkUIDInList(userId) {
    return this.#UIDList.includes(userId);
  }

  /**
   * adds a new user to the user list
   * @param {(number|string)} userId user chat id
   */
  addUID(userId) {
    try {
      if (String(userId).length === 0 ) throw Error('ERROR: empty userId');

        const data = fs.readFileSync(this.#UIDListPath);     
        if (data.length !== 0) {
          const dataArr = JSON.parse(data);
          const dataSet = new Set(dataArr);
          dataSet.add(userId);
          fs.writeFileSync(this.#UIDListPath, JSON.stringify(Array.from(dataSet)));
        } else {
          fs.writeFileSync(this.#UIDListPath, JSON.stringify([userId]));
        }

        this.#UIDList = this.#getUpdateUIDList();
      } catch(err) {
        logger.addLogEntry(`Ошибка добавления пользователя: Некорректный JSON или ID \n${err}`)
      }
  }

   /**
   * delete a user from the user list
   * @param {(number|string)} userId user chat id
   */
   deleteUID(userId) {
    try {
      if (String(userId).length === 0 ) throw Error('ERROR: empty userId');

        const data = fs.readFileSync(this.#UIDListPath);     
        if (data.length !== 0) {
          const dataArr = JSON.parse(data);
          const dataSet = new Set(dataArr);
          dataSet.delete(userId);
          fs.writeFileSync(this.#UIDListPath, JSON.stringify(Array.from(dataSet)));
        } 

        this.#UIDList = this.#getUpdateUIDList();
      } catch(err) {
        logger.addLogEntry(`Ошибка добавления пользователя: Некорректный JSON или ID \n${err}`)
      }
   }

}