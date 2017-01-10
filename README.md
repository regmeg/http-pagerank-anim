# js_animation
Animated browser presentation project  done in  React and Velocity.js, [available on github](https://github.com/rihardsbar/js_animation)

##Pre-reqs
Nodejs and surrounding environment are set up and ready to install packages via npm, highly recommended: [nvm](https://github.com/creationix/nvm) to manage different versions of node.

##Usage
cd into src/ and install the dependencies
`npm install`
then launch the application
`npm start`
.

This launches the webpack module bundler dev server, which is configured to to firstly lint and then transpile JSX and ES6, and bundle them together in the hot mode. Thereby dev can be done without refreshing browser and loosing states to see the updates. In order to see the live application, refer to the localhost:port address that webpack-dev-server provides.

##Some further reading
Using Velocity with React.js
[https://www.npmjs.com/package/velocity-react]

Full Velocity.js documentation
[http://velocityjs.org/]

Velocity-react GitHub
[https://github.com/twitter-fabric/velocity-react]
