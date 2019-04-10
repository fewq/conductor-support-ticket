/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import NavBar from '../admin/NavBar';
import renderer from 'react-test-renderer';
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

test('snapshot testing', () => {
    const tree = renderer
      .create(<NavBar />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
// no routing tests as online says those should be done via integration testing instead.