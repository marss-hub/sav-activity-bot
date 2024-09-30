import * as fs from "node:fs";
/**
 * Класс отвечает за работу с логами - сохранением, обновлением, выдачей данных
 */
export class LogManager {
  #logPath;
  /**
   * Возвращает экземпляр логера который работает с файлом для логов по указанному пути
   * @param {string} logPathStr путь к лог-файлу
   */
  constructor(logPathStr) {
    this.#logPath = logPathStr;
    if (!fs.existsSync(this.#logPath)) {
      fs.closeSync(fs.openSync(this.#logPath, 'w+'));
    }
  }

  /**
   * Делает лог-запись 
   */
  addLogEntry(msg) {
    fs.appendFileSync(this.#logPath, `${String(new Date())} \n${msg} \n\n`);
  }
}
