# React + Redux + Router

### Before running this project, input "npm install" in the terminal. This will automatically download modules that will be used in this project

## Installation Dependencies
```js
react-router-dom
redux
react-redux
redux-devtools-extension
```

## Router
Build Basic Router Structure


## BootStrap
Official website: getbootstrap. com
Chinese website: https://www.bootcss.com/
Bootstrap is the most popular HTML, CSS, and JS framework used for developing responsive layout, mobile first web projects.

## validator
Reference：https://github.com/validatorjs/validator.js

## Cross domain solution
1. Backend: cors third-party
npm install --save cors
2. Front end: Set up cross domain proxy
Reference address: https://github.com/facebook/create-react-app/blob/master/docusaurus/docs/proxying-api-requests-in-development.md

## Dynamically handle styles
classnames
```js
import classnames from 'classnames'

<div className=classnames({
    'class1': true,
    'class2': true
    )>
</div>
```

## linked database
npm install --save mysql

## Server update
1. npm install -g nodemon
2. configuration
3. start：nodemon index.js


## Login verification
1. Return the network request result res in authActions
2. SignInForm accepts the network request result res returned by the action, and the call prompts success and failure
3. Add verification that login username and password cannot be empty: validator. js file operation
4. Login page view response: class style and text prompt
5. Fix the error prompt issue


## token authentication
Reference address: http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

npm install --save jsonwebtoken

technological process:
1. The backend returns a token (the backend needs to configure the token field)
Installation dependency: npm install -- save jsonwebtoken
2. Front end processing of token issues
Redux/Local
3. Modify the top navigation display issue
1. View change
2. Log out and log in



## token process

### What is a token?
Token, user credentials

### What is the function of a token?
The token stores the unique credentials for the user's login status

### Token process
User login ->Generate token ->Store token ->New network request carrying token ->Verify token ->Return data ->Return error message

### Request API to carry token
Carrying tokens in the encapsulation method of network requests
The portability of tokens is carried through request headers!

1. A network request has been added to the server
2. Modify the request header addition scheme for network requests
```js
if (store.getState().auth.user.token) {
    config.headers.Authorization = store.getState().auth.user.token;
}
```
3. Add network requests to the homepage


## Optimize and adjust
1. In the program, try to avoid the existence of strings as they are prone to errors and do not report errors during compilation


This project is only a semi-finished product practiced by a new-learner, and there may be some bugs. Welcome to adjust it