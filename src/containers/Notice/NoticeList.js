/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Breadcrumb, Button, Table, Icon, Pagination, Modal, Input} from 'antd'
const confirm = Modal.confirm;
const Search = Input.Search;
import {changePageNum, getNoticeList} from '../../actions/noticeManage'
import {deleteNotice} from '../../api/noticeManageApi'
import {notificationShow} from '../../utils/notification'
import PageVo from '../../models/PageVo'
import NoticeVo from '../../models/NoticeVo'
import QueueAnim from 'rc-queue-anim'

const qs = require('qs')

class NoticeListPage extends React.Component {
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
      this.props.getNoticeList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getNoticeList({page: this.props.page.voToJson()})
    })
  }

  onDeleteOne = (id) => {
    confirm({
      title: '您确认删除该记录吗？',
      onOk: () => {
        let equipmentTypeVo = new NoticeVo();
        equipmentTypeVo.id = id;
        let noticeList = [];
        noticeList.push(equipmentTypeVo);
        deleteNotice(qs.stringify({postList: JSON.stringify(noticeList)}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success', '删除成功')
                this.props.getNoticeList({page: this.props.page.voToJson()})
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
      title: '公告名称',
      dataIndex: 'name'
    }, {
      title: '公告内容',
      dataIndex: 'context'
    }, {
      title: '公告发布时间',
      dataIndex: 'time',
      render: (time) => {
        return new Date(time).format('yyyy-MM-dd')
      }
    }, {
      title: '操作',
      width: 150,
      render: (item) => (
        <span>
          <Link to={'/editNotice/' + item.id}><Icon type="edit"/></Link>
          <Icon type="delete" style={{cursor: 'pointer', marginLeft: 20, color: 'red'}}
                onClick={() => this.onDeleteOne(item.id)}/>
        </span>
      )
    }];

    return (
      <QueueAnim duration="1200">
        <div key="noticeList" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>公告管理</Breadcrumb.Item>
            <Breadcrumb.Item>公告列表</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Link to="/addNotice"><Button type="primary" icon="plus">新增公告</Button></Link>
            <Search
              placeholder="输入公告名称查找"
              style={{width: 200, float: 'right'}}
              onSearch={this.onSearch}
            />
          </div>
          <div>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                   dataSource={this.props.noticeList ? this.props.noticeList.list : null}/>
            {
              this.props.noticeList ? (<Pagination style={{marginTop: 15}}
                                                 showTotal={(total) => `共${total}条数据`}
                                                 total={this.props.noticeList.total}
                                                 pageSize={this.props.noticeList.pageSize}
                                                 defaultCurrent={this.props.noticeList.pageNum}
                                                 current={this.props.noticeList.pageNum}
                                                 showQuickJumper={true}
                                                 onChange={this.onPageChange}></Pagination>) : (<div>加载中...</div>)
            }

          </div>
        </div>
      </QueueAnim>)
  }

  componentDidMount() {
    this.props.getNoticeList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.noticeManage.page,
    noticeList: state.noticeManage.noticeList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getNoticeList: (page) => {
      dispatch(getNoticeList(page))
    }
  }
}

NoticeListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeListPage)

export default NoticeListPage
