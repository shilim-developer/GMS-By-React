/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';

import {Breadcrumb, Select, Table, Icon, Pagination, Modal, Input} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
import {notificationShow} from '../../utils/notification'
import {changePageNum, getEquipmentLoanList} from '../../actions/equipmentLoanManage'
import PageVo from '../../models/PageVo'
import EquipmentLoanVo from '../../models/EquipmentLoanVo'
import {checkEquipmentLoan} from '../../api/equipmentLoanManageApi'

import '../../utils/dateFormat'
const qs = require('qs')

class EquipmentLoanListPage extends React.Component {
  state = {
    equipmentLoan: new EquipmentLoanVo(),
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
      this.props.getEquipmentLoanList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getEquipmentLoanList({page: this.props.page.voToJson()})
    })
  }

  modalOpen = (item) => {
    if (item.estatus) return;
    this.setState(
      {
        equipmentLoan:
          Object.assign(this.state.equipmentLoan,{equipmentloanid: item.equipmentloanid, estatus: '审核通过'}),
        modalShow: true
      })
  }

  modalClose = () => {
    this.setState({...this.state, modalShow: false})
  }

  onCheckChange = (value) => {
    this.setState({ equipmentLoan:
      Object.assign(this.state.equipmentLoan,{equipmentloanid: this.state.equipmentLoan.equipmentloanid, estatus: value})})
  }

  handleCheck = () => {
    checkEquipmentLoan(qs.stringify({equipmentloan: this.state.equipmentLoan.voToJson()}))
      .then(res => {
        switch (res.data.serviceResult) {
          case 1:
            this.modalClose();
            notificationShow('success', res.data.resultInfo);
            this.props.getEquipmentLoanList({page: this.props.page.voToJson()});
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
      title: '器材名称',
      dataIndex: 'ename'
    }, {
      title: '租借人',
      dataIndex: 'user.account'
    }, {
      title: '租借起始时间',
      dataIndex: 'startdate',
      render: (time) => {
        return new Date(time).format('yyyy-MM-dd')
      }
    }, {
      title: '结束时间时间',
      dataIndex: 'enddate',
      render: (time) => {
        return new Date(time).format('yyyy-MM-dd')
      }
    }, {
      title: '器材总费用',
      dataIndex: 'epayment'
    }, {
      title: '租借数量',
      dataIndex: 'rentnum'
    }, {
      title: '租借状态',
      dataIndex: 'estatus',
      render: (estatus) => {
        if (estatus)
          return estatus
        return '待审核'
      }
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
        <div key="equipmentLoanList" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>器材管理</Breadcrumb.Item>
            <Breadcrumb.Item>租借列表</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Search
              placeholder="输入器材名称查找"
              style={{width: 200, float: 'right'}}
              onSearch={this.onSearch}
            />
            <div style={{clear: 'both'}}></div>
          </div>
          <div>
            <Table rowKey="equipmentloanid" rowSelection={rowSelection} columns={columns} pagination={false}
                   dataSource={this.props.equipmentLoanList ? this.props.equipmentLoanList.list : null}/>
            {
              this.props.equipmentLoanList ? (<Pagination style={{marginTop: 15}}
                                                          showTotal={(total) => `共${total}条数据`}
                                                          total={this.props.equipmentLoanList.total}
                                                          pageSize={this.props.equipmentLoanList.pageSize}
                                                          defaultCurrent={this.props.equipmentLoanList.pageNum}
                                                          current={this.props.equipmentLoanList.pageNum}
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
        </Modal>
      </QueueAnim>)
  }

  componentDidMount() {
    this.props.getEquipmentLoanList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.equipmentLoanManage.page,
    equipmentLoanList: state.equipmentLoanManage.equipmentLoanList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getEquipmentLoanList: (page) => {
      dispatch(getEquipmentLoanList(page))
    }
  }
}

EquipmentLoanListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentLoanListPage)

export default EquipmentLoanListPage
