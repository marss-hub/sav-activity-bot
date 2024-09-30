import * as fs from "node:fs";
import { logger } from "./logger.mjs";
/**
 * Отвечает за работу со списком юзеров - сохранением, обновлением, выдачей данных
 */
export class UserListManager {
    #userListPath;
    #currentList = null; // cache-like

   /**
   * Возвращает экземпляр менеджера который работает с файлом слов по указанному пути
   * @param {string} userListPathStr путь к файлу
   */
  constructor(userListPathStr) {
    this.#userListPath = userListPathStr;
    if (!fs.existsSync(this.#userListPath)) {
      fs.closeSync(fs.openSync(this.#userListPath, 'w+'));
    } 
  }

  addUser(userId) {
    this.#currentList = null;
    try {
      if (String(userId).length === 0 ) throw Error('ERROR: empty userId');

        const data = fs.readFileSync(this.#userListPath);     
        if (data.length !== 0) {
          const dataArr = JSON.parse(data);
          dataArr.push(userId);
          fs.writeFileSync(this.#userListPath, JSON.stringify(dataArr));
        } else {
          fs.writeFileSync(this.#userListPath, JSON.stringify([userId]));
        }
      } catch(err) {
        logger.addLogEntry(`Ошибка добавления пользователя: Некорректный JSON или ID \n${err}`)
      }
  }


}