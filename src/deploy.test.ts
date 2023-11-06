import request, { HttpVerb, Response } from 'sync-request-curl';
import { DEPLOYED_URL } from './deploy';

test('Remove this test and uncomment the tests below', () => {
  expect(1 + 1).toEqual(2);
});

/* // REMOVE ME

// ========================================================================= //
// Helpers

const parseResponse = (res: Response, path: string) => {
  let caughtError = 'Unknown error';
  const body = res.body.toString();
  try {
    // Try returning JSON
    const jsonBody = JSON.parse(body);
    if ('error' in jsonBody && ![400].includes(res.statusCode)) {
      caughtError = `Returned error object with status code ${200}`;
    } else {
      return jsonBody;
    }
  } catch (e: any) {
    caughtError = e.message;
  }
  
  const ret = {
    testName: expect.getState().currentTestName,
    returnedBody: body,
    statusCode: res.statusCode,
    caughtError,
  };
  console.log(`Logging Error:`, ret);
  return ret;
};

const requestHelper = (method: HttpVerb, path: string, payload: object) => {
  let qs = {};
  let json = {};
  if (['GET', 'DELETE'].includes(method)) {
    qs = payload;
  } else {
    // PUT/POST
    json = payload;
  }
  const res = request(method, DEPLOYED_URL + path, { qs, json, timeout: 20000 });
  return parseResponse(res, path);
};

// ========================================================================= //
// Wrapper functions

function clear() {
  return requestHelper('DELETE', '/clear', {});
}

function root() {
  return requestHelper('GET', '/', {});
}

function echo(message: string) {
  return requestHelper('GET', '/echo/echo', { message });
}

function postCreate(sender: string, title: string, content: string) {
  return requestHelper('POST', '/post/create', { sender, title, content });
}

function postsList() {
  return requestHelper('GET', '/posts/list', {});
}

// ========================================================================= //
// Sanity Tests

test('Deployed URL Sanity check', () => {
  const zIDs = (DEPLOYED_URL.match(/z[0-9]{7}/g) || []);

  // URL Sanity test
  expect(zIDs.length).toEqual(1);
  expect(DEPLOYED_URL.startsWith('http')).toBe(true);
  expect(DEPLOYED_URL.endsWith('/')).toBe(false);

  if (process.env.GITLAB_USER_LOGIN) {
    // Pipeline CI test
    expect(zIDs[0]).toEqual(process.env.GITLAB_USER_LOGIN);
  }
});

test('Root', () => {
  expect(root()).toStrictEqual({ message: expect.any(String) });
});

test('Echo', () => {
  expect(echo('wrapper')).toStrictEqual({ message: 'wrapper' });
  expect(echo('echo')).toStrictEqual({ error: expect.any(String) });
});

test('Empty Database', () => {
  clear();
  expect(postsList()).toStrictEqual({ posts: [] });
});

test('Writing/Reading Database', () => {
  clear();
  const post = postCreate('Mat', 'Turtles', 'What other animal is wiser?');
  expect(post).toStrictEqual({ postId: expect.any(Number) });
  expect(postsList()).toStrictEqual({
    posts: [
      { 
        postId: post.postId, 
        sender: 'Mat', 
        title: 'Turtles', 
        timeSent: expect.any(Number)
      }
    ]
  });
});

*/ // REMOVE ME
