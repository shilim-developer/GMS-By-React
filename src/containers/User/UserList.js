/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

import {Breadcrumb, Button, Table, Icon, Pagination,Modal,Input} from 'antd'
const confirm = Modal.confirm;
const Search = Input.Search;
import {notificationShow} from '../../utils/notification'
import {changePageNum, getUserList} from '../../actions/userManage'
import PageVo from '../../models/PageVo'
import UserVo from '../../models/UserVo'
import {deleteUser} from '../../api/userManageApi'

const qs = require('qs')

class UserListPage extends React.Component {
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
      this.props.getUserList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getUserList({page: this.props.page.voToJson()})
    })
  }

  onDeleteOne = (id) => {
    confirm({
      title:'您确认删除该记录吗？',
      onOk:() => {
        let userVo = new UserVo();
        userVo.id = id;
        let userList = [];
        userList.push(userVo);
        deleteUser(qs.stringify({userList:JSON.stringify(userList)}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success','删除成功')
                this.props.getUserList({page: this.props.page.voToJson()})
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
      title: '用户账号',
      dataIndex: 'account'
    }, {
      title: '用户昵称',
      dataIndex: 'name'
    }, {
      title: '用户角色',
      dataIndex: 'role.description'
    }, {
      title: '用户状态',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case 1:
            return '可用'
        }
      }
    }, {
      title: '操作',
      render: (item) => (
        <span>
          <Link to={'/editUser/'+item.id}><Icon type="edit"/></Link>
          <Icon type="delete" style={{cursor: 'pointer', marginLeft: 20,color:'red'}}
                onClick={() => this.onDeleteOne(item.id)}/>
        </span>
      )
    }];

    return (
      <QueueAnim duration="1200">
        <div key="userList" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>用户列表</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Link to="/addUser"><Button type="primary" icon="plus">新增用户</Button></Link>
            <Search
              placeholder="输入用户账户查找"
              style={{ width: 200 ,float:'right'}}
              onSearch={this.onSearch}
            />
          </div>
          <div>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                   dataSource={this.props.userList ? this.props.userList.list : null}/>
            {
              this.props.userList ? (<Pagination style={{marginTop: 15}}
                                                 showTotal={(total) => `共${total}条数据`}
                                                 total={this.props.userList.total}
                                                 pageSize={this.props.userList.pageSize}
                                                 defaultCurrent={this.props.userList.pageNum}
                                                 current={this.props.userList.pageNum}
                                                 showQuickJumper={true}
                                                 onChange={this.onPageChange}></Pagination>) : (<div>加载中...</div>)
            }
          </div>
        </div>
      </QueueAnim>)
  }

  componentDidMount() {
    this.props.getUserList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.userManage.page,
    userList: state.userManage.userList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getUserList: (page) => {
      dispatch(getUserList(page))
    }
  }
}

UserListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListPage)

export default UserListPage
