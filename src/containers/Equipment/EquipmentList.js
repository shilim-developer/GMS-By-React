/**
 * Created by shilim on 2017/7/10.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

import {Breadcrumb, Button, Table, Icon, Pagination, Modal, Input} from 'antd'
const confirm = Modal.confirm;
const Search = Input.Search;
import {notificationShow} from '../../utils/notification'
import {changePageNum, getEquipmentList} from '../../actions/equipmentManage'
import PageVo from '../../models/PageVo'
import EquipmentVo from '../../models/EquipmentVo'
import {deleteEquipment} from '../../api/equipmentManageApi'

const qs = require('qs')

class EquipmentListPage extends React.Component {
  state = {
    selectedRowKeys: []
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }

  onSearch = (value) => {
    this.props.changePageNum(new PageVo(this.props.page.pageNum,
      this.props.page.pageSize, null, value, true))
    setTimeout(()=> {
      this.props.getEquipmentList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getEquipmentList({page: this.props.page.voToJson()})
    })
  }

  onDeleteOne = (id) => {
    confirm({
      title: '您确认删除该记录吗？',
      onOk: () => {
        let equipmentVo = new EquipmentVo();
        equipmentVo.equipmentid = id;
        let equipmentList = [];
        equipmentList.push(equipmentVo);
        deleteEquipment(qs.stringify({equipmentList: JSON.stringify(equipmentList)}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success', '删除成功')
                this.props.getEquipmentList({page: this.props.page.voToJson()})
                break;
              default:
                notificationShow('error', '删除失败')
                break;
            }
          })
          .catch((err) => {
            notificationShow('error',err)
          })
      }
    })
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    }
    const columns = [{
      title: '器材名称',
      dataIndex: 'equipmentname'
    }, {
      title: '器材类型',
      dataIndex: 'equipmentType.typename'
    }, {
      title: '器材规格',
      dataIndex: 'estandard'
    }, {
      title: '器材租借价格',
      dataIndex: 'eprice'
    }, {
        title: '器材总数',
        dataIndex: 'totalnum'
      }, {
        title: '器材可租借数量',
        dataIndex: 'loanablenum'
      }, {
        title: '操作',
        render: (item) => (
          <span>
          <Link to={'/editEquipment/' + item.equipmentid}><Icon type="edit"/></Link>
          <Icon type="delete" style={{cursor: 'pointer', marginLeft: 20, color: 'red'}}
                onClick={() => this.onDeleteOne(item.equipmentid)}/>
        </span>
        )
      }];

    return (
      <QueueAnim duration="1200">
        <div key="equipmentList" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>器材管理</Breadcrumb.Item>
            <Breadcrumb.Item>器材列表</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Link to="/addEquipment"><Button type="primary" icon="plus">新增器材</Button></Link>
            <Search
              placeholder="输入器材名称查找"
              style={{width: 200, float: 'right'}}
              onSearch={this.onSearch}
            />
          </div>
          <div>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                   dataSource={this.props.equipmentList ? this.props.equipmentList.list : null}/>
            {
              this.props.equipmentList ? (<Pagination style={{marginTop: 15}}
                                                      showTotal={(total) => `共${total}条数据`}
                                                      total={this.props.equipmentList.total}
                                                      pageSize={this.props.equipmentList.pageSize}
                                                      defaultCurrent={this.props.equipmentList.pageNum}
                                                      current={this.props.equipmentList.pageNum}
                                                      showQuickJumper={true}
                                                      onChange={this.onPageChange}></Pagination>) : (<div>加载中...</div>)
            }
          </div>
        </div>
      </QueueAnim>)
  }

  componentDidMount() {
    this.props.getEquipmentList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.equipmentManage.page,
    equipmentList: state.equipmentManage.equipmentList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getEquipmentList: (page) => {
      dispatch(getEquipmentList(page))
    }
  }
}

EquipmentListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentListPage)

export default EquipmentListPage
