/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';

import {Breadcrumb, Select, Table, Icon, Pagination, Modal, Input} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
import {notificationShow} from '../../utils/notification'
import {changePageNum, getPlaceLeaseRecordList} from '../../actions/placeLeaseRecordManage'
import PageVo from '../../models/PageVo'
import PlaceLeaseRecordVo from '../../models/PlaceLeaseRecordVo'
import {checkPlaceLeaseRecord} from '../../api/placeLeaseRecordManageApi'

import '../../utils/dateFormat'
const qs = require('qs')

class PlaceLeaseRecordListPage extends React.Component {
  state = {
    placeLeaseRecord: new PlaceLeaseRecordVo(),
    modalShow: false,
    selectedRowKeys: []
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }

  onSearch = (value) => {
    this.props.changePageNum(new PageVo(this.props.page.pageNum,
      this.props.page.pageSize, null, value, true))
    setTimeout(()=> {
      this.props.getPlaceLeaseRecordList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getPlaceLeaseRecordList({page: this.props.page.voToJson()})
    })
  }

  modalOpen = (item) => {
    if (item.checkStatus === '审核通过' || item.checkStatus === '审核不通过') return;
    this.setState(
      {
        placeLeaseRecord:
          Object.assign(this.state.placeLeaseRecord,{id: item.id, checkStatus: '审核通过'}),
        modalShow: true
      })
  }

  modalClose = () => {
    this.setState({ modalShow: false})
  }

  onCheckChange = (value) => {
    this.setState({ placeLeaseRecord:
      Object.assign(this.state.placeLeaseRecord,{id:this.state.placeLeaseRecord.id,checkStatus: value})})
  }

  handleCheck = () => {
    if(this.state.placeLeaseRecord.checkStatus === '审核不通过') {
      this.setState({ placeLeaseRecord:
        Object.assign(this.state.placeLeaseRecord,
          {id:this.state.placeLeaseRecord.id,result: ReactDom.findDOMNode(this.refs.result).value})})
    }
    checkPlaceLeaseRecord(qs.stringify({placeLeaseRecord: this.state.placeLeaseRecord.voToJson()}))
      .then(res => {
        switch (res.data.serviceResult) {
          case 1:
            this.modalClose();
            notificationShow('success', res.data.resultInfo);
            this.props.getPlaceLeaseRecordList({page: this.props.page.voToJson()});
            break;
          default:
            notificationShow('error', res.data.resultInfo);
            break;
        }
      })
      .catch(err => {
        notificationShow('error',err)
      })
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    }
    const columns = [{
      title: '场地名称',
      dataIndex: 'place.placeName'
    }, {
      title: '租借人',
      dataIndex: 'user.account'
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      render: (time) => {
        return new Date(time).format('yyyy-MM-dd hh:mm')
      }
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      render: (time) => {
        return new Date(time).format('yyyy-MM-dd hh:mm')
      }
    }, {
      title: '场地费用',
      dataIndex: 'cost'
    }, {
      title: '审核状态',
      dataIndex: 'checkStatus'
    }, {
      title: '操作',
      render: (item) => (
        <span>
          <Icon type="edit" style={{cursor: 'pointer', color: '#108ee9'}}
                onClick={() => this.modalOpen(item)}/>
        </span>
      )
    }];

    return (
      <QueueAnim duration="1200">
        <div key="placeLeaseRecordList" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>场地管理</Breadcrumb.Item>
            <Breadcrumb.Item>租借列表</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Search
              placeholder="输入场地名称查找"
              style={{width: 200, float: 'right'}}
              onSearch={this.onSearch}
            />
            <div style={{clear: 'both'}}></div>
          </div>
          <div>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                   dataSource={this.props.placeLeaseRecordList ? this.props.placeLeaseRecordList.list : null}/>
            {
              this.props.placeLeaseRecordList ? (<Pagination style={{marginTop: 15}}
                                                          showTotal={(total) => `共${total}条数据`}
                                                          total={this.props.placeLeaseRecordList.total}
                                                          pageSize={this.props.placeLeaseRecordList.pageSize}
                                                          defaultCurrent={this.props.placeLeaseRecordList.pageNum}
                                                          current={this.props.placeLeaseRecordList.pageNum}
                                                          showQuickJumper={true}
                                                          onChange={this.onPageChange}></Pagination>) : (
                <div>加载中...</div>)
            }
          </div>
        </div>
        <Modal title="租借审核" visible={this.state.modalShow}
               onCancel={() => this.modalClose()} onOk={() => this.handleCheck()}>
          <Select style={{width: '100%'}} defaultValue="审核通过" onChange={(value) => this.onCheckChange(value)}>
            <Option value="审核通过">审核通过</Option>
            <Option value="审核不通过">审核不通过</Option>
          </Select>
          {this.state.placeLeaseRecord.checkStatus === '审核不通过'?
            <Input ref="result" style={{marginTop:10,resize:'none'}} type="textarea" rows={4}
            placeholder="请输入不通过的理由"/>:null}

        </Modal>
      </QueueAnim>)
  }

  componentDidMount() {
    this.props.getPlaceLeaseRecordList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.placeLeaseRecordManage.page,
    placeLeaseRecordList: state.placeLeaseRecordManage.placeLeaseRecordList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getPlaceLeaseRecordList: (page) => {
      dispatch(getPlaceLeaseRecordList(page))
    }
  }
}

PlaceLeaseRecordListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceLeaseRecordListPage)

export default PlaceLeaseRecordListPage
