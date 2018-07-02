const { expect } = require('chai');
const { compose, pipe } = require('../index');

describe('kleisli', function() {
  describe('#compose', function() {
    const e = x => x * 2;
    const f = x => Promise.resolve(x + 1);
    const g = x => Promise.resolve(x * 2);
    const w = x => Promise.resolve(x * x);
    it('Should compose two promise-returning functions', async function() {
      const h = compose('then')(f, g);
      const actual = await h(10);
      const expected = 21;

      expect(actual).to.eq(expected);
    });

    it('Should be associative with promise-returning functions.\n\t\t(g <=< f) <=< w = g <=< (f <=< w)', async function() {
      const a = compose('then')(compose('then')(g, f), w);
      const b = compose('then')(g, compose('then')(f, w));
      const actual = await a(10);
      const expected = await b(10);

      expect(actual).to.eq(expected);
    });

    it('Should compose one promise-returning function with one primitive-returning function', async function() {
      const h = compose('then')(f, e);
      const actual = await h(10);
      const expected = 21;

      expect(actual).to.eq(expected);
    });

    it('Should be associative with a mix of promise- and primitive-returning functions.\n\t\t(g <=< f) <=< w = g <=< (f <=< w)', async function() {
      const a = compose('then')(compose('then')(g, f), e);
      const b = compose('then')(g, compose('then')(f, e));
      const actual = await a(10);
      const expected = await b(10);

      expect(actual).to.eq(expected);
    });
  });

  describe('#pipe', function() {
    const e = x => x * 2;
    const f = x => Promise.resolve(x + 1);
    const g = x => Promise.resolve(x * 2);
    const w = x => Promise.resolve(x * x);
    it('Should pipe two promise-returning functions', async function() {
      const h = pipe('then')(f, g);
      const actual = await h(10);
      const expected = 22;

      expect(actual).to.eq(expected);
    });

    it('Should be associative with promise-returning functions.\n\t\t(g >=> f) >=> e = g >=> (f >=> e)', async function() {
      const a = pipe('then')(pipe('then')(g, f), w);
      const b = pipe('then')(g, pipe('then')(f, w));
      const actual = await a(10);
      const expected = await b(10);

      expect(actual).to.eq(expected);
    });

    it('Should pipe one promise-returning function with one primitive-returning function', async function() {
      const h = pipe('then')(f, e);
      const actual = await h(10);
      const expected = 22;

      expect(actual).to.eq(expected);
    });

    it('Should be associative with a mix of promise- and primitive-returning functions.\n\t\t(g >=> f) >=> e = g >=> (f >=> e)', async function() {
      const a = pipe('then')(pipe('then')(g, f), e);
      const b = pipe('then')(g, pipe('then')(f, e));
      const actual = await a(10);
      const expected = await b(10);

      expect(actual).to.eq(expected);
    });
  });
});
