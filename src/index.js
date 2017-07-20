import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import RouterMap from './routers/routers';
import {Provider} from 'react-redux';
import store from './stores/index';
// Render the main component into the dom
ReactDOM.render((
  <Provider store={store()}>
    <RouterMap/>
  </Provider>

), document.getElementById('app'));
