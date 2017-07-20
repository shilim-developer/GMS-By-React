/**
 * Created by shilim on 2017/7/4.
 */

export default class PageVo{
  constructor(pageNum,pageSize,order,keyWords,fuzzy) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.keyWords = keyWords;
    this.fuzzy = fuzzy;
  }

  voToJson() {
    return JSON.stringify(this);
  }
}
