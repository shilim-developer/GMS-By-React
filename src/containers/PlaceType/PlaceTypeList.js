/**
 * Created by shilim on 2017/7/11.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Breadcrumb, Button, Table, Icon, Pagination,Modal,Input} from 'antd'
const confirm = Modal.confirm;
const Search = Input.Search;
import {changePageNum, getPlaceTypeList} from '../../actions/placeTypeManage'
import {deletePlaceType} from '../../api/placeTypeManageApi'
import {notificationShow} from '../../utils/notification'
import PageVo from '../../models/PageVo'
import PlaceTypeVo from '../../models/PlaceTypeVo'
import QueueAnim from 'rc-queue-anim'

const qs = require('qs')

class PlaceTypePage extends React.Component {
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
      this.props.getPlaceTypeList({page: this.props.page.voToJson()})
    })
  }

  onPageChange = (pageNum, pageSize) => {
    this.props.changePageNum(new PageVo(pageNum, pageSize))
    setTimeout(()=> {
      this.props.getPlaceTypeList({page: this.props.page.voToJson()})
    })
  }

  onDeleteOne = (id) => {
    confirm({
      title:'您确认删除该记录吗？',
      onOk:() => {
        let placeTypeVo = new PlaceTypeVo();
        placeTypeVo.id = id;
        let placeTypeList = [];
        placeTypeList.push(placeTypeVo);
        deletePlaceType(qs.stringify({placeTypeList:JSON.stringify(placeTypeList)}))
          .then((res) => {
            switch (res.data.serviceResult) {
              case 1:
                notificationShow('success',res.data.resultInfo)
                this.props.getPlaceTypeList({page: this.props.page.voToJson()})
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
      dataIndex: 'placeTypeName'
    }, {
      title: '操作',
      width:150,
      render: (item) => (
        <span>
          <Link to={'/editPlaceType/'+item.id}><Icon type="edit"/></Link>
          <Icon type="delete" style={{cursor: 'pointer', marginLeft: 20,color:'red'}}
                onClick={() => this.onDeleteOne(item.id)}/>
        </span>
      )
    }];

    return (
      <QueueAnim duration="1200">
        <div key="placeTypeList" style={{padding: 15, background: '#fff', minHeight: 360}}>
          <Breadcrumb>
            <Breadcrumb.Item>场地管理</Breadcrumb.Item>
            <Breadcrumb.Item>场地类型列表</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{margin: '15px 0'}}>
            <Link to="/addPlaceType"><Button type="primary" icon="plus">新增场地类型</Button></Link>
            <Search
              placeholder="输入类型名称查找"
              style={{ width: 200 ,float:'right'}}
              onSearch={this.onSearch}
            />
          </div>
          <div>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} pagination={false}
                   dataSource={this.props.placeTypeList ? this.props.placeTypeList.list : null}/>
            {
              this.props.placeTypeList ? (<Pagination style={{marginTop: 15}}
                                                          showTotal={(total) => `共${total}条数据`}
                                                          total={this.props.placeTypeList.total}
                                                          pageSize={this.props.placeTypeList.pageSize}
                                                          defaultCurrent={this.props.placeTypeList.pageNum}
                                                          current={this.props.placeTypeList.pageNum}
                                                          showQuickJumper={true}
                                                          onChange={this.onPageChange}></Pagination>) : (<div>加载中...</div>)
            }

          </div>
        </div>
      </QueueAnim>)
  }

  componentDidMount() {
    this.props.getPlaceTypeList({page: this.props.page.voToJson()})
  }
}

function mapStateToProps(state) {
  return {
    page: state.placeTypeManage.page,
    placeTypeList: state.placeTypeManage.placeTypeList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageNum: (page) => {
      dispatch(changePageNum(page))
    },
    getPlaceTypeList: (page) => {
      dispatch(getPlaceTypeList(page))
    }
  }
}

PlaceTypePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceTypePage)

export default PlaceTypePage
