# Markus Kannisto - Self Assessment

## Quality and functionality of the code

My code handles error scenarios correctly and returns appropriate HTTP status codes with different scenarios; 500 for server errors, 400 for faulty requests (users fault), and 404 for non-existing rentals.

The code is easy to understand and easy to expand.

All of the tests make sense and test for different possible real world scenarios.

## Challenges faced

There was a challenge with returning an appropriate error for schema validation, but I made it work by adding a check in the try catch block:
```js
try {

  // ...

} catch (ex) {
  console.error("Failed to create new vehicle rental: " + ex);
  if (ex.name === 'ValidationError') {
    res.status(400).json({ error: ex.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
}
```

I also faced a challenge while writing a test, there was a timeout error I got. I looked into it and noticed that my environment variable had a typo.

## What I learned?

I learned to use render.com and learned to write better tests.
