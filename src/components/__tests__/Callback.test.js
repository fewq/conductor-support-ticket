import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { render, cleanup } from 'react-testing-library'
import Callback from '../Callback';
import {toBeInTheDocument, toHaveClass} from 'jest-dom'
expect.extend({toBeInTheDocument, toHaveClass})

test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Callback/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

test('renders greeting text', () => {
    const { getByText } = render(<Callback />)
    let loadingText = getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  })

test('snapshot testing', () => {
    const tree = renderer
      .create(<Callback />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  