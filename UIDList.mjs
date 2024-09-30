import { CONFIGDATA } from "./configData.mjs";
import { UIDListManager } from "./UIDListManager.mjs";

/**
 * модуль создает и экспортирует экземпляр менеджера списка юзеров
 */
export const UIDList = new UIDListManager(CONFIGDATA.user_list_path)