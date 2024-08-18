import React from 'react';
import Card from './card';
import renderer from 'react-test-renderer';

test('renders card component correctly with country, city passed by props', () => {

    const tree = renderer.create(<Card country="Spain" city="Madrid" />).toJSON();
    expect(tree).toMatchSnapshot();
}
);

// test to see if image is rendered correctly
test('renders card component correctly with image passed by props', () => {
    const tree = renderer.create(<Card image="https://www.example.com/image.jpg" />).toJSON();
    expect(tree).toMatchSnapshot();
}
);