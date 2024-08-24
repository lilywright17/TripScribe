import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './input';


test('renders the placeholder text correctly', () => {
  const { getByPlaceholderText } = render(<Input placeholderText="Enter your email" />);
  expect(getByPlaceholderText('Enter your email')).toBeInTheDocument();
});

test('renders the label text correctly', () => {
  const { getByText } = render(<Input labelText="Email" />);
  expect(getByText('Email')).toBeInTheDocument();
});

test('input field can be typed into', () => {
  const { getByPlaceholderText } = render(<Input placeholderText="Enter your email" />);
  const inputField = getByPlaceholderText('Enter your email');
  fireEvent.change(inputField, { target: { value: 'apple.com' } });
    expect(inputField.value).toBe('apple.com');
}
);

test('input field has the correct type', () => {
  const { getByPlaceholderText } = render(<Input inputType="text" placeholderText="Enter your name" />);
  const inputField = getByPlaceholderText('Enter your name');
  expect(inputField).toHaveAttribute('type', 'text');
});

test('input matches snapshot', () => {
  const { asFragment } = render(<Input labelText="Email" inputType="email" placeholderText="Enter your email" />);
  expect(asFragment()).toMatchSnapshot();
});

