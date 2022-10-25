import {Provider} from 'react-redux';

import {store} from '../../store';
import {Layout} from '../Layout';

export const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};
