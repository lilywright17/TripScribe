// testing the input component
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './input';

// test that the placeholder text is rendered correctly
test('renders the placeholder text correctly', () => {
  const { getByPlaceholderText } = render(<Input placeholderText="Enter your email" />);
  expect(getByPlaceholderText('Enter your email')).toBeInTheDocument();
});

// test that the labelText is rendered correctly
test('renders the label text correctly', () => {
  const { getByText } = render(<Input labelText="Email" />);
  expect(getByText('Email')).toBeInTheDocument();
});

// test, using fireEvent, that the input field can be typed into and the value is updated correctly 
test('input field can be typed into', () => {
  const { getByPlaceholderText } = render(<Input placeholderText="Enter your email" />);
  const inputField = getByPlaceholderText('Enter your email');
  fireEvent.change(inputField, { target: { value: 'apple.com' } });
    expect(inputField.value).toBe('apple.com');
}
);

// test that the input field has the correct type
test('input field has the correct type', () => {
  const { getByPlaceholderText } = render(<Input inputType="text" placeholderText="Enter your name" />);
  const inputField = getByPlaceholderText('Enter your name');
  expect(inputField).toHaveAttribute('type', 'text');
});


// create a snapshot test for the input component
test('input matches snapshot', () => {
  const { asFragment } = render(<Input labelText="Email" inputType="email" placeholderText="Enter your email" />);
  expect(asFragment()).toMatchSnapshot();
});

/*
The test is verifying that the <Input> component, when rendered with the given props, 
produces the same output as a previously saved snapshot. 
If the component's output changes in the future, this test will detect that change by failing, 
alerting the developer to review and update the snapshot if the change is intentional.
*/


