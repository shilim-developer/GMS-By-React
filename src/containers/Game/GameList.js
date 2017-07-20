/**
 * Created by shilim on 2017/6/12.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Breadcrumb, Button, Table, Icon, Pagination, Modal, Input} from 'antd'
const confirm = Modal.confirm;
const Search = Input.Search;
import {changePageNum, getGameList} from '../../actions/gameManage'
import {deleteGame} from '../../api/gameManageApi'
import {notificationShow} from '../../utils/notification'
import PageVo from '../../models/PageVo'
import GameVo from '../../models/GameVo'
import QueueAnim from 'rc-queue-anim'

const qs = require('qs')

class GameListPage extends React.Component {
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
      this.props.getGameList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getGameList({page: this.props.page.voToJson()})
    })
  }

  onDeleteOne = (id) => {
    confirm({
      title: '您确认删除该记录吗？',
      onOk: () => {
        let equipmentTypeVo = new GameVo();
        equipmentTypeVo.id = id;
        let gameList = [];
        gameList.push(equipmentTypeVo);
        deleteGame(qs.stringify({gameList: JSON.stringify(gameList)}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success', '删除成功')
                this.props.getGameList({page: this.props.page.voToJson()})
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

  statusFormat = (status) => {
    let out = status;
    if(status==null){
      out = '待审核';
    }else if(status===1){
      out = '审核通过';
    }else{
      out = '审核未通过';
    }
    return out;
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    }
    const columns = [{
      title: '赛事名称',
      dataIndex: 'gamename'
    }, {
      title: '赛事类型',
      dataIndex: 'gametype'
    }, {
      title: '场地位置',
      dataIndex: 'gameplace'
    }, {
      title: '赛事器材',
      dataIndex: 'equip'
    }, {
      title: '赛事时间',
      dataIndex: 'gametime',
      render: (time) => {
        return new Date(time).format('yyyy-MM-dd')
      }
    }, {
      title: '赛事介绍',
      dataIndex: 'gamedec'
    }, {
      title: '赛事状态',
      dataIndex: 'status',
      render: (item) => (
        <span>{this.statusFormat(item)}</span>
      )

    }, {
      title: '操作',
      width: 150,
      render: (item) => (
        <span>
          <Link to={'/editGame/' + item.id}><Icon type="edit"/></Link>
          <Icon type="delete" style={{cursor: 'pointer', marginLeft: 20, color: 'red'}}
                onClick={() => this.onDeleteOne(item.id)}/>
        </span>
      )
    }];

    return (
      <QueueAnim duration="1200">
        <div key="gameList" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>器材管理</Breadcrumb.Item>
            <Breadcrumb.Item>器材类型列表</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Link to="/addGame"><Button type="primary" icon="plus">新增赛事</Button></Link>
            <Search
              placeholder="输入赛事名称查找"
              style={{width: 200, float: 'right'}}
              onSearch={this.onSearch}
            />
          </div>
          <div>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                   dataSource={this.props.gameList ? this.props.gameList.list : null}/>
            {
              this.props.gameList ? (<Pagination style={{marginTop: 15}}
                                                 showTotal={(total) => `共${total}条数据`}
                                                 total={this.props.gameList.total}
                                                 pageSize={this.props.gameList.pageSize}
                                                 defaultCurrent={this.props.gameList.pageNum}
                                                 current={this.props.gameList.pageNum}
                                                 showQuickJumper={true}
                                                 onChange={this.onPageChange}></Pagination>) : (<div>加载中...</div>)
            }

          </div>
        </div>
      </QueueAnim>)
  }

  componentDidMount() {
    this.props.getGameList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.gameManage.page,
    gameList: state.gameManage.gameList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getGameList: (page) => {
      dispatch(getGameList(page))
    }
  }
}

GameListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameListPage)

export default GameListPage
