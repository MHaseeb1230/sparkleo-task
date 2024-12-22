# Dashboard and SignIn Page - Next.js Project

This project demonstrates a simple authentication flow using Next.js and React, including a sign-in page and a dashboard with user management features. The sign-in page allows users to log in, and the dashboard displays a list of users that can be filtered and paginated. New users can also be added to the system.

## Features

- **Sign In Page:**
  - Users can sign in using their email and password.
  - The form validates if both email and password are provided before allowing sign-in.
  - The "Keep me logged in" checkbox is available.
  - The form includes a "Forget password" link and a "Create account" link.

  email :  test@example.com
  password : password123

- **Dashboard Page:**
  - After a successful sign-in, users are redirected to the dashboard.
  - Users can view a paginated list of users with the ability to search by name or email.
  - Users can add new users by filling in a name and email form.
  - User data is fetched from a placeholder API and stored in local storage.
  - Users can be added to the list, and the data is stored in local storage.

## Tech Stack

- **Next.js 13**
- **React**
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **LocalStorage** to persist user data
- **JSONPlaceholder API** for mock user data
- **React Router** for navigation (`useRouter` hook)

## File Structure

