import React from 'react';
import ReactDOM from 'react-dom';
import ClientDashboard from '../client/Dashboard';
import renderer from 'react-test-renderer';

// more test will be added when there is more frontend development here

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
test('snapshot testing', () => {
  const tree = renderer
    .create(<ClientDashboard />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
