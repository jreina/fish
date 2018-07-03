const { expect } = require('chai');
const { compose, pipe } = require('../index');

describe('kleisli', function() {
  const composeP = compose('then');
  const pipeP = pipe('then');
  const e = x => x * 2;
  const f = x => Promise.resolve(x + 1);
  const g = x => Promise.resolve(x * 2);
  const w = x => Promise.resolve(x * x);
  describe('#compose', function() {
    it('Should compose two promise-returning functions.', async function() {
      const h = composeP(
        f,
        g
      );
      const actual = await h(10);
      const expected = 21;

      expect(actual).to.eq(expected);
    });

    it('Should be associative with promise-returning functions.\n\t\t(g <=< f) <=< w = g <=< (f <=< w)', async function() {
      const a = composeP(
        composeP(
          g,
          f
        ),
        w
      );
      const b = composeP(
        g,
        composeP(
          f,
          w
        )
      );
      const actual = await a(10);
      const expected = await b(10);

      expect(actual).to.eq(expected);
    });

    it('Should compose one promise-returning function with one primitive-returning function.', async function() {
      const h = composeP(
        f,
        e
      );
      const actual = await h(10);
      const expected = 21;

      expect(actual).to.eq(expected);
    });

    it('Should be associative with a mix of promise- and primitive-returning functions.\n\t\t(g <=< f) <=< w = g <=< (f <=< w)', async function() {
      const a = composeP(
        composeP(
          g,
          f
        ),
        e
      );
      const b = composeP(
        g,
        composeP(
          f,
          e
        )
      );
      const actual = await a(10);
      const expected = await b(10);

      expect(actual).to.eq(expected);
    });
  });

  describe('#pipe', function() {
    it('Should pipe two promise-returning functions.', async function() {
      const h = pipeP(
        f,
        g
      );
      const actual = await h(10);
      const expected = 22;

      expect(actual).to.eq(expected);
    });

    it('Should be associative with promise-returning functions.\n\t\t(g >=> f) >=> e = g >=> (f >=> e)', async function() {
      const a = pipeP(
        pipeP(
          g,
          f
        ),
        w
      );
      const b = pipeP(
        g,
        pipeP(
          f,
          w
        )
      );
      const actual = await a(10);
      const expected = await b(10);

      expect(actual).to.eq(expected);
    });

    it('Should pipe one promise-returning function with one primitive-returning function.', async function() {
      const h = pipeP(
        f,
        e
      );
      const actual = await h(10);
      const expected = 22;

      expect(actual).to.eq(expected);
    });

    it('Should be associative with a mix of promise- and primitive-returning functions.\n\t\t(g >=> f) >=> e = g >=> (f >=> e)', async function() {
      const a = pipeP(
        pipeP(
          g,
          f
        ),
        e
      );
      const b = pipeP(
        g,
        pipeP(
          f,
          e
        )
      );
      const actual = await a(10);
      const expected = await b(10);

      expect(actual).to.eq(expected);
    });

    it('Should exemplify a real-ish but still contrived example from README.', async function() {
      const getUserById = _id =>
        Promise.resolve({ _id, name: 'Susan', jobId: 2 });
      const getJobById = _id =>
        Promise.resolve({ _id, name: 'Rattlesnake Groomer' });
      const prop = key => obj => obj[key];

      const getJobByUserId = pipeP(
        getUserById,
        prop('jobId'),
        getJobById,
        prop('name')
      );
      const actual = await getJobByUserId(10);
      const expected = 'Rattlesnake Groomer';
      expect(actual).to.eq(expected);
    });
  });
});
