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
import {changePageNum, getPlaceList} from '../../actions/placeManage'
import PageVo from '../../models/PageVo'
import PlaceVo from '../../models/PlaceVo'
import PlaceStatusVo from '../../models/PlaceStatusVo'
import {getPlaceStatus, deletePlace} from '../../api/placeManageApi'

const qs = require('qs')

class PlaceListPage extends React.Component {
  state = {
    modalShow: false,
    selectedRowKeys: [],
    statusList:[]
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys});
  }

  onSearch = (value) => {
    this.props.changePageNum(new PageVo(this.props.page.pageNum,
      this.props.page.pageSize, null, value, true))
    setTimeout(()=> {
      this.props.getPlaceList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getPlaceList({page: this.props.page.voToJson()})
    })
  }

  onGetPlaceStatus = (id) => {
    let placeStatusVo = new PlaceStatusVo();
    placeStatusVo.placeId = id;
    getPlaceStatus(qs.stringify({placeStatus: placeStatusVo.voToJson()}))
      .then(res => {
        switch (res.data.serviceResult) {
          case 1:
            this.setState({statusList:res.data.resultParam})
            this.setState({modalShow: true})
            break;
          default:
            notificationShow('error', res.data.resultInfo)
            break;
        }
      })
      .catch(err => {
        notificationShow('error',err)
      })
  }

  onDeleteOne = (id) => {
    confirm({
      title: '您确认删除该记录吗？',
      onOk: () => {
        let placeVo = new PlaceVo();
        placeVo.id = id;
        let placeList = [];
        placeList.push(placeVo);
        deletePlace(qs.stringify({placeList: JSON.stringify(placeList)}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success', '删除成功')
                this.props.getPlaceList({page: this.props.page.voToJson()})
                break;
              default:
                notificationShow('error', res.data.resultInfo)
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
      title: '场地名称',
      dataIndex: 'placeName'
    }, {
      title: '场地类型',
      dataIndex: 'placeType.placeTypeName'
    }, {
      title: '场地位置',
      dataIndex: 'placeLocation'
    }, {
      title: '租借费用',
      dataIndex: 'cost'
    }, {
      title: '场地状态',
      render: (item) => (
        <span style={{cursor: 'pointer', verticalAlign: 'top', color: '#108ee9'}}
              onClick={() => this.onGetPlaceStatus(item.id)}>
          <Icon type="eye" style={{fontSize: 18}}/> 查看
        </span>
      )
    }, {
      title: '操作',
      render: (item) => (
        <span>
          <Link to={'/editPlace/' + item.id}><Icon type="edit"/></Link>
          <Icon type="delete" style={{cursor: 'pointer', marginLeft: 20, color: 'red'}}
                onClick={() => this.onDeleteOne(item.id)}/>
        </span>
      )
    }];
    const tableCellTHStyle = {padding:'8px 8px',background:'#f7f7f7',borderRight:'1px solid #e9e9e9',borderBottom:'1px solid #e9e9e9'};
    const tableCellTDStyle = {padding:'8px 8px',borderRight:'1px solid #e9e9e9',borderBottom:'1px solid #e9e9e9'};

    return (
      <QueueAnim duration="1200">
        <div key="placeList" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>场地管理</Breadcrumb.Item>
            <Breadcrumb.Item>场地列表</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Link to="/addPlace"><Button type="primary" icon="plus">新增场地</Button></Link>
            <Search
              placeholder="输入场地名称查找"
              style={{width: 200, float: 'right'}}
              onSearch={this.onSearch}
            />
          </div>
          <div>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                   dataSource={this.props.placeList ? this.props.placeList.list : null}/>
            {
              this.props.placeList ? (<Pagination style={{marginTop: 15}}
                                                  showTotal={(total) => `共${total}条数据`}
                                                  total={this.props.placeList.total}
                                                  pageSize={this.props.placeList.pageSize}
                                                  defaultCurrent={this.props.placeList.pageNum}
                                                  current={this.props.placeList.pageNum}
                                                  showQuickJumper={true}
                                                  onChange={this.onPageChange}></Pagination>) : (<div>加载中...</div>)
            }
          </div>
        </div>
        <Modal title="场地状态" visible={this.state.modalShow} footer={null}
               onCancel={() => this.setState({modalShow: false})}>
          <table style={{width:'100%',border:'1px solid #e9e9e9',borderSpacing:0,borderRight:0,borderBottom:0}}>
            <thead>
            <tr>
              <th style={tableCellTHStyle}></th>
              <th style={tableCellTHStyle}>日</th>
              <th style={tableCellTHStyle}>一</th>
              <th style={tableCellTHStyle}>二</th>
              <th style={tableCellTHStyle}>三</th>
              <th style={tableCellTHStyle}>四</th>
              <th style={tableCellTHStyle}>五</th>
              <th style={tableCellTHStyle}>六</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th style={tableCellTHStyle}>第一节</th>
              {this.state.statusList.map(item => {
                if(item.timeId<=7) {
                  return <td style={tableCellTDStyle}>{item.placeStatus}</td>
                }
              })}
            </tr>
            <tr>
              <th style={tableCellTHStyle}>第二节</th>
              {this.state.statusList.map(item => {
                if(item.timeId>7&&item.timeId<=14) {
                  return <td style={tableCellTDStyle}>{item.placeStatus}</td>
                }
              })}
            </tr>
            <tr>
              <th style={tableCellTHStyle}>第三节</th>
              {this.state.statusList.map(item => {
                if(item.timeId>14&&item.timeId<=21) {
                  return <td style={tableCellTDStyle}>{item.placeStatus}</td>
                }
              })}
            </tr>
            <tr>
              <th style={tableCellTHStyle}>第四节</th>
              {this.state.statusList.map(item => {
                if(item.timeId>21&&item.timeId<=28) {
                  return <td style={tableCellTDStyle}>{item.placeStatus}</td>
                }
              })}
            </tr>
            <tr>
              <th style={tableCellTHStyle}>第五节</th>
              {this.state.statusList.map(item => {
                if(item.timeId>28&&item.timeId<=35) {
                  return <td style={tableCellTDStyle}>{item.placeStatus}</td>
                }
              })}
            </tr>
            </tbody>
          </table>
        </Modal>
      </QueueAnim>)
  }

  componentDidMount() {
    this.props.getPlaceList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.placeManage.page,
    placeList: state.placeManage.placeList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getPlaceList: (page) => {
      dispatch(getPlaceList(page))
    }
  }
}

PlaceListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceListPage)

export default PlaceListPage
