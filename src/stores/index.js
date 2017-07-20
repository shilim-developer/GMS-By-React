/**
 * Created by shilim on 2017/7/3.
 */
import {createStore,applyMiddleware} from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';

export default function configureStore() {
  let store = createStore(reducers,applyMiddleware(thunk),
    // 触发 redux-devtools
    window.devToolsExtension ? window.devToolsExtension() : undefined
  );
  return store;
}
