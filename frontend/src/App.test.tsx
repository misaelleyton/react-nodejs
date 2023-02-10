import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import App from './App'
import '@testing-library/jest-dom'

test('renders initial form', () => {
  render(<App />)
  const linkElement = screen.getByText(/Vehicle Reservations/i)
  expect(linkElement).toBeInTheDocument()
})

test("user can type on name bar and should not show results because of required fields", async () => {
  render(<App />);
  const textInput = screen.getByTestId("name");
  expect(textInput).toBeInTheDocument();
  userEvent.type(textInput, "Spiderman");
  const button = screen.getByText('Next')
  fireEvent.click(button)
  let resultsList = screen.queryByText(/Payment method/);
  expect(resultsList).not.toBeInTheDocument();
});

