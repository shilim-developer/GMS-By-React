/**
 * Created by shilim on 2017/7/3.
 */
import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory()

import App from '../containers/index';
import RoleListPage from '../containers/Role/RoleList'
import RoleAddictionPage from '../containers/Role/RoleAddiction'
import RoleEditionPage from '../containers/Role/RoleEdition'
import UserListPage from '../containers/User/UserList'
import UserAddictionPage from  '../containers/User/UserAddiction'
import UserEditionPage from '../containers/User/UserEdition'
import EquipmentTypePage from '../containers/EquipmentType/EquipmentTypeList'
import EquipmentTypeAddictionPage from '../containers/EquipmentType/EquipmentTypeAddiction'
import EquipmentTypeEditionPage from '../containers/EquipmentType/EquipmentTypeEdition'
import EquipmentListPage from '../containers/Equipment/EquipmentList'
import EquipmentAddictionPage from '../containers/Equipment/EquipmentAddiction'
import EquipmentEditionPage from '../containers/Equipment/EquipmentEdition'
import EquipmentLoanListPage from '../containers/EquipmentLoan/EquipmentLoanList'
import PlaceTypeListPage from '../containers/PlaceType/PlaceTypeList'
import PlaceTypeAddictionPage from '../containers/PlaceType/PlaceTypeAddiction'
import PlaceTypeEditionPage from '../containers/PlaceType/PlaceTypeEdition'
import PlaceListPage from '../containers/Place/PlaceList'
import PlaceAddictionPage from '../containers/Place/PlaceAddiction'
import PlaceEditionPage from '../containers/Place/PlaceEdition'
import PlaceLeaseRecordListPage from '../containers/PlaceLeaseRecord/PlaceLeaseRecordList'
import GameListPage from '../containers/Game/GameList'
import GameAddictionPage from '../containers/Game/GameAddiction'
import GameEditionPage from '../containers/Game/GameEdition'
import NoticeListPage from '../containers/Notice/NoticeList'
import NoticeAddictionPage from '../containers/Notice/NoticeAddiction'
import NoticeEditionPage from '../containers/Notice/NoticeEdition'

export default class RouterMap extends React.Component {
  render() {
    return (
      <Router history={history}>
        <App>
          {/*<Route path="/roleList" component={RoleListPage}/>
          <Route path="/addRole" component={RoleAddictionPage}/>
          <Route path="/editRole/:id" component={RoleEditionPage}/>
          <Route path="/userList" component={UserListPage}/>
          <Route path="/addUser" component={UserAddictionPage}/>
          <Route path="/editUser/:id" component={UserEditionPage}/>
          <Route path="/equipmentTypeList" component={EquipmentTypePage}/>
          <Route path="/addEquipmentType" component={EquipmentTypeAddictionPage}/>
          <Route path="/editEquipmentType/:id" component={EquipmentTypeEditionPage}/>
          <Route path="/equipmentList" component={EquipmentListPage}/>
          <Route path="/addEquipment" component={EquipmentAddictionPage}/>
          <Route path="/editEquipment/:id" component={EquipmentEditionPage}/>
          <Route path="/equipmentLoanList" component={EquipmentLoanListPage}/>
          <Route path="/placeTypeList" component={PlaceTypeListPage}/>
          <Route path="/addPlaceType" component={PlaceTypeAddictionPage}/>
          <Route path="/editPlaceType/:id" component={PlaceTypeEditionPage}/>
          <Route path="/placeList" component={PlaceListPage}/>
          <Route path="/addPlace" component={PlaceAddictionPage}/>
          <Route path="/editPlace/:id" component={PlaceEditionPage}/>
          <Route path="/placeLeaseRecordList" component={PlaceLeaseRecordListPage}/>
          <Route path="/gameList" component={GameListPage}/>
          <Route path="/addGame" component={GameAddictionPage}/>
          <Route path="/editGame/:id" component={GameEditionPage}/>
          <Route path="/noticeList" component={NoticeListPage}/>
          <Route path="/addNotice" component={NoticeAddictionPage}/>
          <Route path="/editNotice/:id" component={NoticeEditionPage}/>*/}
        </App>
      </Router>)
  }
}
