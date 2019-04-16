import React from 'react'
import Main from "../Main"
import { render, cleanup } from 'react-testing-library'
import renderer from 'react-test-renderer';
import {toBeInTheDocument, toHaveClass} from 'jest-dom'

expect.extend({toBeInTheDocument, toHaveClass})

afterEach(cleanup)

var mockAuth = {
    isAuthenticated: () => true
  };

test('renders greeting text', () => {
    const { getByText } = render(<Main auth={mockAuth} />)
    let greetingText = getByText(/Hey/);
    expect(greetingText).toBeInTheDocument();
  })

  test('snapshot testing', () => {
    const tree = renderer
    .create(<Main auth={mockAuth} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  