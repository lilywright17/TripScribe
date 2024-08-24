import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';

test('renders button component correctly with buttonText passed by props', () => {
    const buttonText = "Back";
    const component = renderer.create(<Button buttonText={buttonText} />)
    const tree = component.toJSON();
    
    expect(tree).toMatchSnapshot();
})
