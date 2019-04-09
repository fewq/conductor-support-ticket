import React from 'react'
import Main from "../Main"
import { render, fireEvent, cleanup, queryByTestId } from 'react-testing-library'
import { createMemoryHistory } from 'history'
import { Link, Route, Router} from 'react-router-dom'
import {toBeInTheDocument, toHaveClass} from 'jest-dom'

expect.extend({toBeInTheDocument, toHaveClass})

afterEach(cleanup)

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

var mockAuth = {
    isAuthenticated: () => true
  };

test('renders greeting text', () => {
    const { getByText } = render(<Main auth={mockAuth} />)
    let greetingText = getByText(/Hey/);
    expect(greetingText).toBeInTheDocument();
  })
  