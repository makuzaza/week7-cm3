# Markus Kannisto - Self Assessment

## Quality and functionality of the code

My code implements the required API endpoints and authentication functionality. I made sure that the application handles different scenarios properly and returns appropriate HTTP status codes when errors occur.

I focused on writing clear and maintainable code so that the API structure is easy to understand and extend. I also implemented validation and error handling to ensure that incorrect requests are handled properly.

I wrote tests for the API endpoints using Jest and Supertest to verify that the backend behaves correctly in different situations.

## Challenges faced

One challenge I faced was related to testing with MongoDB. Initially, my tests were not working because the test MongoDB URI was not configured correctly for the local environment. After investigating the issue, I realized that the tests were not connecting to the correct testing database. Once I fixed the configuration, the tests worked as expected.

I also faced challenges with deploying the frontend. After troubleshooting the configuration and testing different solutions, I was able to successfully deploy it.

## What I learned?

During this project I learned how to implement authentication in a backend API, write automated tests with Jest and Supertest, and configure MongoDB databases for different environments.

I also gained more experience debugging configuration issues and working through problems related to testing and deployment.