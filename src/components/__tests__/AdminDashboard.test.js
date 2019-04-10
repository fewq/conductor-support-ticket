import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AdminDashboard from '../admin/Dashboard';

// more test will be added when there is more frontend development here

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('snapshot testing', () => {
  const tree = renderer
    .create(<AdminDashboard />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

