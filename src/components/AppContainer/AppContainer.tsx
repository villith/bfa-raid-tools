import * as React from 'react';
import App from '../App/App';
import './AppContainer.css';

class AppContainer extends React.Component {
  public render() {
    return (
      <div style={{ padding: 8 }}>
        <App />
      </div>
    );
  }
}

export default AppContainer;