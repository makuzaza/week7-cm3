# Minoo - Self Assessment

## Quality and functionality of the code

My code implements the **Frontend V1** of the vehicle rental application using React.  
The application allows users to view, create, update, and delete vehicle rentals through a clear and simple user interface.

The code structure is organized into **components and pages**, which makes it easier to understand and maintain.  
React hooks such as **useState and useEffect** are used to manage state and fetch data from the backend API.

The frontend communicates with the backend using **fetch requests** to perform CRUD operations.  
Routing is handled with **React Router**, which allows navigation between pages such as the home page, add vehicle page, edit page, and vehicle details page.

Overall, the code is readable, modular, and easy to extend for future features.

## Challenges faced

One challenge was connecting the frontend to the deployed backend API on Render.  
Initially, the application was using a local backend, so I had to configure the **Vite proxy** to correctly route API requests to the deployed backend service.

Another challenge was handling state updates after deleting a rental.  
At first, refreshing the page was required to see the updated list, but I adjusted the logic so the UI updates correctly after delete operations.

I also had to ensure that routing worked correctly for dynamic pages such as editing a vehicle rental using the rental ID.

## What I learned?

Through this project I improved my understanding of:

- React component structure and page routing
- Using **useState** and **useEffect** for state management
- Connecting a React frontend to a backend API using **fetch**
- Managing frontend routing with **React Router**
- Working with a team using **Git branches, commits, and pull requests**