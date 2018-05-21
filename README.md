# BEM React component creator
Helpers to create BEM like React components/
## Examples

```shell 
$ npm install bem-react-component-creator --save
```
### Example 1
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

### Example 2
Putting the BEM wrappers in a different file and exporting them as a single component.

```js
// Post.js

import bcc from 'bem-react-component-creator';
const Button = (props) => {
  return <button {...props}>{props.children}</button>
};
const { block, element } = bcc('post');

const Post = block('div');
Post.Picture = element('img', 'picture');
Post.Title = element('h2', 'title', 'awesome', 'large');
Post.Phrase = element('p', 'phrase');
Post.ShareButton = element(Button, 'share-button', 'success');

export default Post;

```


```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Post from './Post';
  
ReactDOM.render(
  <Post>
      <Post.Picture
          src="https://http://via.placeholder.com/50x50"
          alt="Post illustration"
      />
      <Post.Title>Test title</Post.Title>
      <Post.Phrase>
          An awesome phrase
      </Post.Phrase>
      <Post.Phrase modifiers="emphasized,colorful">
          An awesome phrase
      </Post.Phrase>
      <Post.ShareButton>
        Share!
      </Post.ShareButton>
  </Post>,
  document.getElementById('root')
);

```

This will get the same result as the previous example.
