# fish
_The `(>=>)` operator in JavaScript. Kinda._

## Usage
```javascript
const f = x => Promise.resolve(x + 1);
const g = x => Promise.resolve(x * 2);
const h = kliesi('then')(f, g);

await h(10)
// <- 21
```
