import React from 'react'
import ViewTicket from '../client/ViewTicket';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, wait, fireEvent, cleanup } from 'react-testing-library'
import {toBeInTheDocument, toHaveClass} from 'jest-dom'
expect.extend({toBeInTheDocument, toHaveClass})

afterEach(cleanup)

var mockTicketState = {
    state: {
        ticket: {
            id: 1
        }
    }
}

// asynchronous testing to be implemented

// describe("Renders ticket details correctly", () => {
//     afterEach(cleanup)
    

// })

// describe("Render Status Update History", () => {
//     afterEach(cleanup)
//     beforeEach(() => {
//         axios.get = jest.fn(() => Promise.resolve(mockTicket))
//     })

// })


test('snapshot testing', () => {
    const tree = renderer
      .create(<BrowserRouter>
      <ViewTicket location={mockTicketState} />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });