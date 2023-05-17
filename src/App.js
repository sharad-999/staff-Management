import { Provider } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import Pages from '../src/pages';
import store from './store/store';

function App() {
  return (
    <div className="">
      <Provider store={store}>
      <Router>
        <Pages/>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
