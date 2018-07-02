const kleisli = bindKey => (...fs) => x =>
  fs.reduceRight((memo, f) => (memo[bindKey] ? memo[bindKey](f) : f(memo)), x);
module.exports = kleisli;
