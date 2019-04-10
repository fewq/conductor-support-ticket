import React from 'react'
import TableRow from '../client/TicketListTableRow';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'
import renderer from 'react-test-renderer';

import {toBeInTheDocument, toHaveClass} from 'jest-dom'

expect.extend({toBeInTheDocument, toHaveClass})

afterEach(cleanup);

var obj = {
    dateOfCreation: new Date(),
    formType: "bug",
    title: "some title",
    statusToClient: "Pending Admin"
}



describe("retrieves and renders props correctly", () => {
    test("Date", () => {
        const { getByText } = render(<BrowserRouter>
            <TableRow obj={obj} />
            </BrowserRouter>)
        const date = getByText(/2019/);
        expect(date).toBeDefined();
    })

    test("Title", () => {
        const { getByText } = render(<BrowserRouter>
            <TableRow obj={obj} />
            </BrowserRouter>)
        const title = getByText("some title");
        expect(title).toBeDefined();
    })

    test("Form Type", () => {
        const { getByText } = render(<BrowserRouter>
            <TableRow obj={obj} />
            </BrowserRouter>)
        const formType = getByText("bug");
        expect(formType).toBeDefined();
    })

    test("Ticket Status", () => {
        const { getByText } = render(<BrowserRouter>
            <TableRow obj={obj} />
            </BrowserRouter>)
        const statusToClient = getByText(/pending/i);
        expect(statusToClient).toBeDefined();
    })
})

describe("Rendering Action buttons", () => {
    test("has button to delete the ticket", () => {
        const { getByText } = render(<BrowserRouter>
            <TableRow obj={obj} />
            </BrowserRouter>)
        const deleteButton = getByText(/delete/i);
        expect(deleteButton).toBeDefined();
    })
    
    test("has button to view the ticket", () => {
        const { getByText } = render(<BrowserRouter>
            <TableRow obj={obj} />
            </BrowserRouter>)
        const deleteButton = getByText(/view/i);
        expect(deleteButton).toBeDefined();
    })
})


test('snapshot testing', () => {
    const tree = renderer
      .create(<BrowserRouter>
        <TableRow obj={obj} />
        </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });