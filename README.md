# fish
_The `(>=>)` operator in JavaScript. Kinda._

## Install
```bash
npm install fish-operator
```

## Usage
```javascript
const kleisli = require('fish-operator');

const f = x => Promise.resolve(x + 1);
const g = x => Promise.resolve(x * 2);
const h = kleisli('then')(f, g);

await h(10)
// <- 21
```
