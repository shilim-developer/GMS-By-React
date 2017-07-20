/**
 * Created by shilim on 2017/7/4.
 */
export default class UserVo{
  id;
  account;
  password;
  name;
  cardno;
  email;
  mobilephone;
  address;
  status;
  role;
  statusDescription;
  constructor() {

  }

  voToJson() {
    return JSON.stringify(this);
  }
}
