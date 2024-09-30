import * as fs from "node:fs";
import { logger } from "./logger.mjs";
/**
 * Отвечает за работу со списком юзеров - сохранением, обновлением, выдачей данных
 */
export class UIDListManager {
    #UIDListPath;

   /**
   * Возвращает экземпляр менеджера который работает с файлом списка слов по указанному пути
   * @param {string} UIDListPathStr путь к файлу
   */
  constructor(UIDListPathStr) {
    this.#UIDListPath = UIDListPathStr;
    if (!fs.existsSync(this.#UIDListPath)) {
      fs.closeSync(fs.openSync(this.#UIDListPath, 'w+'));
    } 
  }

  /**
   * Возвращает массив id пользователей из файла списка (или пустой массив при отсутствии UID пользователей)
   * @returns {Array.<string, number>}
   */
  getUIDList() {
    let result = [];
    const data = fs.readFileSync(this.#UIDListPath);     
        if (data.length !== 0) {
          result = JSON.parse(data);
        } else {
          logger.addLogEntry(`ERROR: received empty userId list`)
        }
        return result;
  }

  /**
   * добавляет нового пользователя в список пользователей
   * @param {(number|boolean)} userId id чата пользователя
   */
  addUID(userId) {
    try {
      if (String(userId).length === 0 ) throw Error('ERROR: empty userId');

        const data = fs.readFileSync(this.#UIDListPath);     
        if (data.length !== 0) {
          const dataArr = JSON.parse(data);
          dataArr.push(userId);
          fs.writeFileSync(this.#UIDListPath, JSON.stringify(dataArr));
        } else {
          fs.writeFileSync(this.#UIDListPath, JSON.stringify([userId]));
        }
      } catch(err) {
        logger.addLogEntry(`Ошибка добавления пользователя: Некорректный JSON или ID \n${err}`)
      }
  }


}