import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import { render, fireEvent, cleanup, queryByTestId, getByDisplayValue, getByValue } from 'react-testing-library'
import {toBeInTheDocument, toHaveClass} from 'jest-dom'
expect.extend({toBeInTheDocument, toHaveClass})

afterEach(cleanup)

let mockAuth = {
  isAuthenticated: () => true
};

// tests
describe("Basic UI tests", () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App auth={mockAuth}  />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  test('Renders app header: title, subtitle, logo', () => {
    const { getByText, getByAltText } = render(<App auth={mockAuth} />);
    let expectedText = {
      title: /ACNAPI Ticket Support System/i,
      subtitle: /Powered by the Conductor Project/i,
    }
    let appTitle = getByText(expectedText.title);
    let appSubtitle = getByText(expectedText.subtitle);
    let appLogo = getByAltText(/logo/);
    expect(appTitle).toBeDefined();
    expect(appSubtitle).toBeDefined();
    expect(appLogo).toBeDefined();
  })

  test('Styling of app header elements', () => {
    const { getByText, getByAltText } = render(<App auth={mockAuth} />);
    let expectedText = {
      title: /ACNAPI Ticket Support System/i,
      subtitle: /Powered by the Conductor Project/i,
    }
    let appSubtitle = getByText(expectedText.subtitle);
    let appLogo = getByAltText(/logo/);
    expect(appSubtitle).toHaveClass("subtitle");
    expect(appLogo).toHaveClass("App-logo");
  })
})

describe("Rendering App's first page under different conditions", () => {
  test('Default case: Main Component', () => {
    let location = "";
    const { getByText } = render(<App location={location} auth={mockAuth} />);
    const greetingText = getByText(/Hey,/i);
    expect(greetingText).toBeInTheDocument();
    
  });

  test('Authenticating: Callback Component', () => {
    let location = "callback";
    const { getByText } = render(<App location={location} auth={mockAuth} />);
    const loadingText = getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  test('Authenticated: Restricted Component', () => {
    let location = "restricted";
    const { getByText } = render(<App location={location} auth={mockAuth} />);
    const logOutButton = getByText(/Logout/i)
    expect(logOutButton).toBeInTheDocument();
  })

  test('Not Authenticated: NotFound Component', () => {
    let location = "restricted";
    let mockAuth = {
      isAuthenticated: () => false
    };
    const { getByText } = render(<App location={location} auth={mockAuth} />);
    let expectedText = getByText(/not found/i)
    expect(expectedText).toBeDefined();
  })

})

