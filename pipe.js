const pipe = bindKey => (...fs) => x =>
  fs.reduce((memo, f) => (memo[bindKey] ? memo[bindKey](f) : f(memo)), x);
module.exports = pipe;
