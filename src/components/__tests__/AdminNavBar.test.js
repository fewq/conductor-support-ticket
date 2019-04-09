/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import NavBar from '../admin/NavBar';
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

    test("Kanban", () => {
        const { getByText } = render (<NavBar />);
        expect(getByText('Kanban')).toBeDefined();
    });

    test("Table View", () => {
        const { getByText } = render (<NavBar />);
        expect(getByText('Table View')).toBeDefined();
    });
})

// no routing tests as online says those should be done via integration testing instead.