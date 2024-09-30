import { CONFIGDATA } from "./configData.mjs";
import { UserListManager } from "./UserListManager.mjs";

/**
 * модуль создает и экспортирует экземпляр менеджера списка юзеров
 */
export const userList = new UserListManager(CONFIGDATA.user_list_path)