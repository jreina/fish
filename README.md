# fish
_The `(>=>)` and `(<=<)` operators in JavaScript. Kinda._

## Install
```bash
npm install fish-operator
```

## Usage
The first parameter of these functions is the `string` or `Symbol` key of the `bind` method for the objects returned by the functions to compose. A bind method will have the signature `bind :: (A -> m<B>) -> m<B>` for a given `m<A>`. For Promises, this will be the `then` method so you will pass in `'then'` as the first parameter. The following examples show this idea using Promise-returning functions:

```javascript
const { compose, pipe } = require('fish-operator');

const f = x => Promise.resolve(x + 1);
const g = x => Promise.resolve(x * 2);

const h = compose('then')(f, g);
await h(10);
// <- 21

const j = pipe('then')(f, g);
await h(10);
// <- 22
```

In the _real world_, you would probably use these functions like this:
```javascript
const { pipe } = require('fish-operator');
const pipeP = pipe('then');
const prop = key => obj => obj[key];

// Fictitious Promise-returning API functions...
const getUserById = _id => Promise.resolve({ _id, name: 'Susan', jobId: 2 });
const getJobById = _id => Promise.resolve({ _id, name: 'Rattlesnake Groomer' });

const getJobByUserId = pipeP(getUserById, prop('jobId'), getJobById, prop('name'));
await getJobByUserId(10);
// <- 'Rattlesnake Groomer'
```

Each function accepts any number of functions that return either a value or an object with a method that matches the `bindKey` parameter given.
