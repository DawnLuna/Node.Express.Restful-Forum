# Restful Forum 

A Node Express Restful backend forum with MongoDB. Checkout wiki for api.

## Getting Started

### Prerequisites

Npm 6+ installed

### Installing

download or clone code. Create a file named ".env" at the root directory with the following content, make changes as you wish:

```
APP_PORT=5000
MONGODB_ADDRESS=localhost
MONGODB_DATABASE=Node_Express_Restful-Forum
JWT_SECRET=key
SALT_ROUND=10
ROOTADMIN_USERNAME=root
ROOTADMIN_PASSWORD=password
```

Run the following commands in the code directory to install packages and init project:

```
npm install
npm run init-forum
```

then run the following command to start the forum:
```
npm start
```

## Built With

* [Node.js](https://nodejs.org/) - a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).
* [Express](https://expressjs.com/) - a fast, unopinionated, minimalist web framework for Node.js.
* [MongoDB ](https://www.mongodb.com/) - a general purpose, document-based, distributed database.
* [Babel](https://babeljs.io/) - a JavaScript compiler.

## Versioning

Using [SemVer](http://semver.org/) for versioning. 
