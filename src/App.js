import { memo } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import Routes from './routes';
import reducers from './store/reducers';
import { thunk } from 'redux-thunk';

function App() {
  const middlewareEnhancer = applyMiddleware(thunk);
  const composedEnhancers = compose(middlewareEnhancer);

  return (
    <Provider store={createStore(reducers, undefined, composedEnhancers)}>
      <Routes />
    </Provider>
  );
}

export default memo(App);
