/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Breadcrumb, Button, Table, Icon, Pagination,Modal,Input} from 'antd'
const confirm = Modal.confirm;
const Search = Input.Search;
import {changePageNum, getEquipmentTypeList} from '../../actions/equipmentTypeManage'
import {deleteEquipmentType} from '../../api/equipmentTypeManageApi'
import {notificationShow} from '../../utils/notification'
import PageVo from '../../models/PageVo'
import EquipmentTypeVo from '../../models/EquipmentTypeVo'
import QueueAnim from 'rc-queue-anim'

const qs = require('qs')

class EquipmentTypePage extends React.Component {
  state = {
    selectedRowKeys: []
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }

  onSearch = (value) => {
    this.props.changePageNum(new PageVo(this.props.page.pageNum,
      this.props.page.pageSize,null,value,true))
    setTimeout(()=> {
      this.props.getEquipmentTypeList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getEquipmentTypeList({page: this.props.page.voToJson()})
    })
  }

  onDeleteOne = (id) => {
    confirm({
      title:'您确认删除该记录吗？',
      onOk:() => {
        let equipmentTypeVo = new EquipmentTypeVo();
        equipmentTypeVo.typeid = id;
        let equipmentTypeList = [];
        equipmentTypeList.push(equipmentTypeVo);
        deleteEquipmentType(qs.stringify({equipmentTypeList:JSON.stringify(equipmentTypeList)}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success','删除成功')
                this.props.getEquipmentTypeList({page: this.props.page.voToJson()})
                break;
              default:
                notificationShow('error','删除失败')
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
      title: '类型名称',
      dataIndex: 'typename'
    }, {
      title: '操作',
      width:150,
      render: (item) => (
        <span>
          <Link to={'/editEquipmentType/'+item.typeid}><Icon type="edit"/></Link>
          <Icon type="delete" style={{cursor: 'pointer', marginLeft: 20,color:'red'}}
                onClick={() => this.onDeleteOne(item.typeid)}/>
        </span>
      )
    }];

    return (
      <QueueAnim duration="1200">
      <div key="equipmentTypeList" style={{padding: 15, background: '#fff', minHeight: 360}}>
        <Breadcrumb>
          <Breadcrumb.Item>器材管理</Breadcrumb.Item>
          <Breadcrumb.Item>器材类型列表</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{margin: '15px 0'}}>
          <Link to="/addEquipmentType"><Button type="primary" icon="plus">新增器材类型</Button></Link>
          <Search
            placeholder="输入类型名称查找"
            style={{ width: 200 ,float:'right'}}
            onSearch={this.onSearch}
          />
        </div>
        <div>
          <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                 dataSource={this.props.equipmentTypeList ? this.props.equipmentTypeList.list : null}/>
          {
            this.props.equipmentTypeList ? (<Pagination style={{marginTop: 15}}
                                               showTotal={(total) => `共${total}条数据`}
                                               total={this.props.equipmentTypeList.total}
                                               pageSize={this.props.equipmentTypeList.pageSize}
                                               defaultCurrent={this.props.equipmentTypeList.pageNum}
                                               current={this.props.equipmentTypeList.pageNum}
                                               showQuickJumper={true}
                                               onChange={this.onPageChange}></Pagination>) : (<div>加载中...</div>)
          }

        </div>
      </div>
        </QueueAnim>)
  }

  componentDidMount() {
    this.props.getEquipmentTypeList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.equipmentTypeManage.page,
    equipmentTypeList: state.equipmentTypeManage.equipmentTypeList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getEquipmentTypeList: (page) => {
      dispatch(getEquipmentTypeList(page))
    }
  }
}

EquipmentTypePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentTypePage)

export default EquipmentTypePage
