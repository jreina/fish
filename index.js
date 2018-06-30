const kliesi = bindKey => (...fs) => x =>
  fs.reduceRight((memo, f) => (memo[bindKey] ? memo[bindKey](f) : f(memo)), x);
module.exports = kliesi;
