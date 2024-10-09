import { CONFIGDATA } from "./configData.mjs";
import { UIDListManager } from "./UIDListManager.mjs";

/**
* module creates and exports an instance of the user list manager
 */
export const UIDList = new UIDListManager(CONFIGDATA.user_list_path)