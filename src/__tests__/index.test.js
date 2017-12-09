import React from 'react';
import renderer from 'react-test-renderer';
import BemComponentsCreator from '../index.js';

it('creates successfully a BEM based Widget', () => {
    const PostBEM = BemComponentsCreator('post');
    const Post = PostBEM.block('div');
    const Picture = PostBEM.element('img', 'picture');
    const Title = PostBEM.element('h2', 'title', 'awesome', 'large');
    const Phrase = PostBEM.element('p', 'phrase');

    const tree = renderer
    .create(
        <Post>
            <Picture
                src="https://http://via.placeholder.com/50x50"
                alt="Post illustration"
            />
            <Title>Test title</Title>
            <Phrase>
                An awesome phrase
            </Phrase>
            <Phrase modifiers="emphasized,colorful">
                An awesome phrase
            </Phrase>
        </Post>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
});