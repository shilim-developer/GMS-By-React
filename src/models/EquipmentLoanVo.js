/**
 * Created by shilim on 2017/7/10.
 */
export default class EquipmentLoanVoVo{
  equipmentloanid;
  estatus;
  constructor() {
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
