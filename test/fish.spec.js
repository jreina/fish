const { expect } = require('chai');
const kleisli = require('../index');

describe('#fish', function() {
  const e = x => x * 2;
  const f = x => Promise.resolve(x + 1);
  const g = x => Promise.resolve(x * 2);
  it('Should compose two promise-returning functions', async function() {
    const h = kleisli('then')(f, g);
    const actual = await h(10);
    const expected = 21;

    expect(actual).to.eq(expected);
  });

  it('Should be associative', async function() {
    const h = kleisli('then')(g, f);
    const actual = await h(10);
    const expected = 22;

    expect(actual).to.eq(expected);
  });

  it('Should compose one promise-returning function with one primitive-returning function', async function() {
    const h = kleisli('then')(f, e);
    const actual = await h(10);
    const expected = 21;

    expect(actual).to.eq(expected);
  });

  it('Should be associative again', async function() {
    const h = kleisli('then')(e, f);
    const actual = await h(10);
    const expected = 22;

    expect(actual).to.eq(expected);
  });
});
