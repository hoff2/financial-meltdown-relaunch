# Financial Meltdown: a React Redux app skeleton & katas

_now for React 17!_
(originally by Anthony Clifton, Pillar Technology; adapted by Chuck Hoffman)

## Why?

It's easy to understand the pieces of a technical stack
in terms of their functionality, syntax, and idioms. You can do katas
on each of them individually to learn to write code, and to drive changes
with testing.

What we've seen in engagements, however, is that skilled artisans can become
lost when test driving features and changes in the midst of all the pieces
moving together.

Challenges will appear if you:

- don't understand the architecture and lifecycle of the frameworks
- how they interact with other frameworks in a running system
- don't take a methodical approach to driving in change

Pairs can struggle for hours or even days with:

- naming of code modules, functions, variables
- trying to change too many pieces at once
- conceiving of what to test that's valuable
- how objects, callback functions, and events move through the lifecycle
- how to design or choose patterns for new features

Some questions you may encounter as you work in large or growing systems:

- What's the right mix of testing strategies? To add a feature? To drive in a change?
- How should you organize your source code?
- What choices should you make if you are confronted with an ambiguous contract
  versus backend endpoints?
- How do your choices change if several pairs are working in the same code?  
  Several teams? Dozens of teams?
- How do you avoid breaking changes in a continous delivery/deployment scenario?

## What's this?

This repository contains a project designed to show how we want to structure
applications on the frontend in React. It has the following
frameworks and dependencies set up for you:

- React (core framework) <https://reactjs.org/>
- Redux (state management) <https://react-redux.js.org/>
- tcomb (type management and object validation) <https://github.com/gcanti/tcomb>
- fetch (REST api calls) and fetch-mock for unit tests
- toastify (on screen informational or error notifications)
  <https://fkhadra.github.io/react-toastify/introduction>
- jest (unit and integration testing) <https://jestjs.io/>
- cypress (e2e and/or acceptance testing) <https://www.cypress.io/>
- A simplistic backend fake system in Spring Boot to provide a REST API

No UI frameworks such as Material Design or Bootstrap are used.

The application's functionality is to allow the user to maintain a single customer,
with their details and their financed items, which is persistd in a simple backend
server implemented in Java and Spring Boot.

- To start the frontend app: `npm run start`
- To run frontend unit tests: `npm run test`
- The backend app is in the `server` directory, where the `./run-server.sh`
script starts it up in a Docker image.
- To run frontend acceptance tests (once both of the above are running):
`./node_modules/.bin/cypress open`
- The backend app also has unit and integration tests: `./mvnw test`

## What can I do with it?

In addition to being a helpful example app for reference, this repository can be used
for some kata exercises to help you learn to:

- Add a feature by test driving all of the necessary pieces of ReactJS, Redux, and tcomb
- Add a property to existing domain and data transfer objects
- Change a property in the domain and data transfer objects while maintaining backward compatibility

You can safely and quickly make changes to systems with complex lifecycles
by working your way around the lifecycle methodically, using test strategies
that provide value and a safety net that tracks your movements.

A common challenge is adding a feature to a React app using Redux. Pairs
who try to add too many of the Redux pieces at the same time can find they
spend a lot time debugging what should be working code. A methodical TDD
strategy can overcome this.

Depending on your project's overall test matrix, you can accomplish this
with unit tests, integration tests, acceptance/e2e tests, or a combination.

### Kata Exercises

You are asked to add features, make changes, and fix defects in a continuously
deployed enterprise application. Internal representives use it to keep track
of customers and items that they've financed. Currently, users can update
customer details, add financed items, and update the backend systems with
changes. Once a financed item has been processed by the backend, it can no
longer be modified.

#### Feature: Add Postal Code

As a user, I want to store the customer's postal code, so that bills can be sent
to a deliverable address

Given I have set the customer's postal code
When I update the customer details
Then the postal code is persisted

Tech Note: This property will be added to both the frontend and backend.

#### Defect: Rate to Interest Rate

In all places where Rate appears or is referenced in source code,
it should be called Interest Rate or interestRate instead. On the frontend,
just indicating Rate does not comply with federal regulations. On the backend,
nightly batch processing systems do not recognize the 'rate' property.

Tech Note: Backward compatibility must be maintained for instances of the
frontend that may still send the property in requests as 'rate' rather than
'interestRate.'

#### Feature: Delete Financed Item

As a user, I want to delete financed items, so that customers aren't billed for
things they didn't purchase

Given a financed item exists
When I delete it
Then it is removed from display
And that removal is persisted

### Strategy for Kata exercises

Think of the Redux lifecycle as starting with the Store. State is maintained
there. You provide properties from this state to the View, where you display
it. When you click a button to perform an operation or change a value, you
may want to update the state either directly with the new value, or with the
response from an API call. So you call an Action Creator. The action
creator may or may not call an API to send or retrieve some data, but
will almost always emit one or more events. Those events are "heard" by
one or more reducers which will use tcomb to return state updates based
on the events' payload.

Most of kata exercises can be completed methodically by following something
like the following process:

1. Write an acceptance test that will demonstrate you've met acceptance
   criteria for both frontend and backend, as necessary
2. Unit or integration test drive changes into the View. Provide empty
   functions as properties if necessary.
3. Unit or integration test drive changes into Action Creators. Provide
   empty or stubbed API calls if necessary.
4. Wire a new action creator to the view through the Connector if necessary.
5. Unit or integration test drive changes into API calls. (You may find it
   easier to swap the order of playing #3 and #5.)
6. Unit or integration test drive changes into Reducers. Make sure your
   actions match in your action creator and your reducer.
7. Wire your reducer into combineReducers if necessary.
8. Your acceptance test should now pass unless it relies on changes to the
   backend. If so drive changes into your backend.

Obstacles that may trip you up:

- Views, action creators, actions, reducers can end up with very similar names.
  Watch out for imports pointing to the wrong thing. Typically, you'll see
  error complaints about your call signature when this happens.
- Don't feel compelled to test that an action emitted by your action creator
  is received by a reducer. Are you testing your code or the framework?
