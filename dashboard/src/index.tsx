import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import stores from './stores';
import GraphPage from './pages/GraphPage';
import 'semantic-ui-css/semantic.min.css'

// Configure MobX
configure({enforceActions: 'observed'});

// Create the Application
const Application = () => {
  return (
    <Provider {...stores}>
      <GraphPage />
    </Provider>
  );
};

// Render the Application
ReactDOM.render(<Application />, document.getElementById('application'));
