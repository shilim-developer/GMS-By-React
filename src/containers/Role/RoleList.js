/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Breadcrumb, Button, Table, Icon, Pagination,Modal} from 'antd'
const confirm = Modal.confirm;
import {changePageNum, getRoleList} from '../../actions/roleManage'
import {deleteRole} from '../../api/roleManageApi'
import {notificationShow} from '../../utils/notification'
import PageVo from '../../models/PageVo'
import RoleVo from '../../models/RoleVo'
import QueueAnim from 'rc-queue-anim'

const qs = require('qs')

class RoleListPage extends React.Component {
  state = {
    selectedRowKeys: []
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getRoleList({page: this.props.page.voToJson()})
    })
  }

  onDeleteOne = (id) => {
    confirm({
      title:'您确认删除该记录吗？',
      onOk:() => {
        let roleVo = new RoleVo();
        roleVo.id = id;
        let roleList = [];
        roleList.push(roleVo);
        deleteRole(qs.stringify({roleList:JSON.stringify(roleList)}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success','删除成功')
                this.props.getRoleList({page: this.props.page.voToJson()})
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
      title: '角色名',
      dataIndex: 'description'
    }, {
      title: '操作',
      width:150,
      render: (item) => (
        <span>
          <Link to={'/editRole/'+item.id}><Icon type="edit"/></Link>
          <Icon type="delete" style={{cursor: 'pointer', marginLeft: 20,color:'red'}}
                onClick={() => this.onDeleteOne(item.id)}/>
        </span>
      )
    }];

    return (
      <QueueAnim duration="1200">
      <div key="roleList" style={{padding: 15, background: '#fff', minHeight: 360}}>
        <Breadcrumb>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>角色列表</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{margin: '15px 0'}}>
          <Link to="/addRole"><Button type="primary" icon="plus">新增角色</Button></Link>
        </div>
        <div>
          <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                 dataSource={this.props.roleList ? this.props.roleList.list : null}/>
          {
            this.props.roleList ? (<Pagination style={{marginTop: 15}}
                                               showTotal={(total) => `共${total}条数据`}
                                               total={this.props.roleList.total}
                                               pageSize={this.props.roleList.pageSize}
                                               defaultCurrent={this.props.roleList.pageNum}
                                               current={this.props.roleList.pageNum}
                                               showQuickJumper={true}
                                               onChange={this.onPageChange}></Pagination>) : (<div>加载中...</div>)
          }

        </div>
      </div>
        </QueueAnim>)
  }

  componentDidMount() {
    this.props.getRoleList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.roleManage.page,
    roleList: state.roleManage.roleList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getRoleList: (page) => {
      dispatch(getRoleList(page))
    }
  }
}

RoleListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleListPage)

export default RoleListPage
