# BEM React component creator
Helpers to create BEM like React components/
## Example

```shell 
$ npm install bem-react-component-creator --save
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import BemComponentsCreator from 'bem-react-component-creator';

const PostBEM = BemComponentsCreator('post');
const Post = PostBEM.block('div');
const Button = (props) => {
  return <button {...props}>{props.children}</button>
};
const Picture = PostBEM.element('img', 'picture');
const Title = PostBEM.element('h2', 'title', 'awesome', 'large');
const Phrase = PostBEM.element('p', 'phrase');
const ShareButton = PostBEM.element(Button, 'share-button', 'success');
  
ReactDOM.render(
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
      <ShareButton>
        Share!
      </ShareButton>
  </Post>,
  document.getElementById('root')
);

```

It will render

```html
  <div className="post">
    <img
      alt="Post illustration"
      className="post__picture"
      src="https://http://via.placeholder.com/50x50"
    />
    <h2
      className="post__title post__title--awesome post__title--large"
    >
      Test title
    </h2>
    <p className="post__phrase">
      An awesome phrase
    </p>
    <p className="post__phrase post__phrase--emphasize post__phrase--colorful"
    >
      An awesome phrase
    </p>
    <button class="post__share-button post__share-button--success">
      Share!
    </button>
  </div>

```

