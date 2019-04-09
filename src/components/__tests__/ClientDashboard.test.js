import React from 'react';
import ReactDOM from 'react-dom';
import ClientDashboard from '../client/Dashboard';

describe("Basic UI tests", () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ClientDashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  
})
