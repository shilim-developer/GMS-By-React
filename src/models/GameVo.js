/**
 * Created by shilim on 2017/7/12.
 */
export default class EquipmentTypeVo{
  id;
  gamename;
  gametype;
  gameplace;
  equip;
  gametime;
  gamedec;
  status;
  constructor() {
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
