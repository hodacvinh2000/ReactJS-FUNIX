import React, {Component} from 'react';
import Main from './components/MainComponent';
import { BrowserRouter} from 'react-router-dom';
import './App.css';
import { STAFFS } from './shared/staffs';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

localStorage.setItem('staffs',JSON.stringify(STAFFS));

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
