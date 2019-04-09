/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import NavBar from '../client/NavBar';
import {render, cleanup} from 'react-testing-library'
import {toBeInTheDocument, toHaveClass} from 'jest-dom'
expect.extend({toBeInTheDocument, toHaveClass})

afterEach(cleanup)

// tests

describe("Render Navigation Labels", () => {
    test("ACNAPI Logo", () => {
        const { getByAltText } = render (<NavBar />);
        expect(getByAltText("ACNAPI")).toBeDefined();
    });

    test("Manage Tickets", () => {
        const { getByText } = render (<NavBar />);
        expect(getByText(/Manage/i)).toBeDefined();
    });

    test("Create Ticket", () => {
        const { getByText } = render (<NavBar />);
        expect(getByText(/Create/)).toBeDefined();
    });
})

// no routing tests as online says those should be done via integration testing instead.