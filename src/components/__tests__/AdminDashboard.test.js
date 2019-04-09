import React from 'react';
import ReactDOM from 'react-dom';
import AdminDashboard from '../admin/Dashboard';

// dashboard currently has nothing else

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

