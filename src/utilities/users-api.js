// USERS routes. Used frequently so make a variable.
// PROXY allows this. Redirects front end stuff to back end.
import sendRequest from "./send-request";

// REFACTORED NON-DRY CODE (BELOW)
const BASE_URL = "/api/users";

export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

// NO data sent, default is a get request (see helper below)
export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

/* 
SLIDES
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-14/day-2/slides/

CODE ALONG
https://app.slack.com/client/T04411PBUN8/C056A692JAX/thread/C056A692JAX-1695052776.226929

// DAY 5
// =============
Starting with "Send the Token with AJAX Request"
If you have problems with your app.
Restart server
Clear localStorage
localStorage.clear()

When you sign up, you create a user and a user token within the user
User needs to pass the schema
Then passes user object to the client
Client authenticates the user token and puts the token in localStorage
Needs to persist so we can stay logged in, display data, authorize as well

AUTHORIZATION
Sending another header in the login function that is auth. Another is content type
First, a button that checks the expiration of login (just to start)
User event on the FRONT END (order history)

// USERS API
// =============
Handles request of login from Sign Up Form

// DAY 4
// =============
// Putting AJAX request for login into a service module (not the SignUp form)
// Service module is anything that is not not an AJAX call but not a view
// We'll use it to make a token (maybe a util). Will call a try catch function. Then the Component will call that function.
// Of course, we'll have to import it.
// The point: separation of concerns.

// CODE WITH NOTES
// ===============
// USERS routes. Used frequently so make a variable.
// PROXY allows this. Redirects front end stuff to back end.
const BASE_URL = "/api/users";

export async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const res = await fetch(BASE_URL, {
    method: "POST", // because creating a user
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    // like req.body
    // Sending object but if we send just strings it will need multiple requests
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  // Res has an OK default property
  // (SLIDES) STEP 3: "it needs to be persisted"
  if (backendResponse.ok) {
    return backendResponse.json();
  } else {
    throw new Error(`Sign-Up Unsuccessful`);
  }
}

// BACKEND
// WILL go to back end to finish this request.
// Gets a 404 at first.
// Using Express router.
// Each main page will have its own route.

// routes>api (make the api folder)
*/

/* 
OLD CODE GOT REFACTORED
const BASE_URL = "/api/users";

// SIGN UP
export async function signUp(userData) {
  const backendResponse = await fetch(BASE_URL, {
    method: "POST", // because creating a user
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (backendResponse.ok) {
    return backendResponse.json();
  } else {
    throw new Error(`Couldn't Sign-Up`);
  }
}

// LOG IN
export async function login(credentials) {
  const backendResponse = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (backendResponse.ok) {
    return backendResponse.json();
  } else {
    throw new Error(`Couldn't Login`);
  }
}
*/
