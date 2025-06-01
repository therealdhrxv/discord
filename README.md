# Discord Clone

## Introduction/Overview

This project is a full-stack, real-time chat application inspired by Discord. It aims to provide a seamless communication experience with features like real-time messaging, server and channel creation, direct messaging, file sharing, user authentication, role-based access control, live audio/video calls, and more.

## Features

Key features of the application include:

- Real-time messaging using WebSockets
- Create and join servers
- Create text, audio, and video channels within servers
- Direct messaging between users
- File and image uploads in messages and servers
- User authentication and profiles
- Role-based access control (Admin, Moderator, Guest)
- Live video and audio communication using LiveKit
- Emoji support in messages
- Light/Dark mode theme

## Tech Stack

The project is built using the following technologies:

- **Frontend:**
    - [Next.js](https://nextjs.org/) (v13) - React framework for server-side rendering and static site generation.
    - [React](https://reactjs.org/) (v18) - JavaScript library for building user interfaces.
    - [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing.
    - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
    - [Zustand](https://github.com/pmndrs/zustand) - Minimalistic state management library for React.
    - [Radix UI](https://www.radix-ui.com/) - Headless UI components for building accessible design systems.
    - [Emoji Mart](https://github.com/missive/emoji-mart) - Customizable emoji picker component for React.
- **Backend:**
    - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - For building serverless API endpoints.
    - [Prisma](https://www.prisma.io/) (ORM) - Next-generation ORM for Node.js and TypeScript.
    - [Socket.IO](https://socket.io/) - For real-time, bidirectional event-based communication.
- **Database:**
    - [MySQL](https://www.mysql.com/) - Open-source relational database management system.
- **Authentication:**
    - [Clerk](https://clerk.com/) - User management and authentication platform.
- **File Uploads:**
    - [UploadThing](https://uploadthing.com/) - Type-safe file uploads for modern web apps.
- **Real-time Audio/Video:**
    - [LiveKit](https://livekit.io/) - Open-source WebRTC stack for building real-time audio and video experiences.
- **Styling & UI:**
    - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
    - [`shadcn/ui`](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
    - [`lucide-react`](https://lucide.dev/) - Simply beautiful open-source icons.
- **Tooling:**
    - [ESLint](https://eslint.org/) - Pluggable linting utility for JavaScript and JSX.
    - [Prettier](https://prettier.io/) - Opinionated code formatter.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** v18.x or later (Download from [nodejs.org](https://nodejs.org/))
- **npm** or **yarn:** npm is included with Node.js. To install yarn (optional): `npm install -g yarn`
- **MySQL:** A running MySQL server instance (Download from [mysql.com](https://www.mysql.com/downloads/))
- **Git:** For cloning the repository (Download from [git-scm.com](https://git-scm.com/downloads/))

## Getting Started (Setup Instructions)

Follow these steps to get your development environment set up:

1.  **Clone the repository:**
    Replace `https://github.com/your-username/your-repository-name.git` with the actual URL of this repository.
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```
2.  **Navigate to the project directory:**
    Replace `your-repository-name` with the name of the directory cloned in the previous step.
    ```bash
    cd your-repository-name
    ```
3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
4.  **Set up environment variables:**
    Copy the example environment file `.env.example` to a new file named `.env`:
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and update the placeholder values with your actual credentials and endpoints as described in the "Environment Variables" section.

5.  **Set up the database:**
    *   Ensure your MySQL server is running and accessible.
    *   Verify that the `DATABASE_URL` in your `.env` file correctly points to your MySQL instance (e.g., `mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`).
    *   Apply the database schema using Prisma:
        ```bash
        npx prisma db push
        ```
        This command creates the database if it doesn't exist (based on your connection string) and applies the schema defined in `prisma/schema.prisma`.
        *(Note: `prisma generate` for Prisma Client generation is part of the `postinstall` and `build` scripts, so you usually don't need to run it manually.)*

## Environment Variables

This project requires certain environment variables to be set. Create a `.env` file in the root of your project by copying the `.env.example` file:

```bash
cp .env.example .env
```

Then, fill in the necessary values in the `.env` file:

-   `DATABASE_URL`: Your MySQL database connection string.
    *   **Purpose:** Connects to your MySQL database for data storage.
    *   **Example:** `mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`
    *   **Note:** Ensure your MySQL server is running and accessible. Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE_NAME` with your actual database credentials.

-   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key.
    *   **Purpose:** Used on the client-side to interact with Clerk for authentication.
    *   **Where to get it:** Obtain from your [Clerk Dashboard](https://dashboard.clerk.com/) under your application's API Keys section.

-   `CLERK_SECRET_KEY`: Your Clerk secret key.
    *   **Purpose:** Used on the server-side for Clerk authentication.
    *   **Where to get it:** Obtain from your [Clerk Dashboard](https://dashboard.clerk.com/) under your application's API Keys section. **Keep this secret and never expose it publicly.**

-   `UPLOADTHING_SECRET`: Your UploadThing secret key.
    *   **Purpose:** Authenticates your application with UploadThing for file uploads.
    *   **Where to get it:** Obtain from your [UploadThing Dashboard](https://uploadthing.com/dashboard) under "API Keys". **Keep this secret.**

-   `UPLOADTHING_APP_ID`: Your UploadThing App ID.
    *   **Purpose:** Identifies your application within UploadThing.
    *   **Where to get it:** Obtain from your [UploadThing Dashboard](https://uploadthing.com/dashboard) (usually found in the "API Keys" or a specific app settings section).

-   `LIVEKIT_API_KEY`: Your LiveKit API key.
    *   **Purpose:** Authenticates your server with your LiveKit instance for managing rooms and tokens.
    *   **Where to get it:** Obtain from the [LiveKit Cloud dashboard](https://cloud.livekit.io/) (Project Settings -> API Keys) or your self-hosted LiveKit instance configuration. **Keep this secret.**

-   `LIVEKIT_API_SECRET`: Your LiveKit API secret.
    *   **Purpose:** Used in conjunction with the API key to authenticate with LiveKit.
    *   **Where to get it:** Obtain from the [LiveKit Cloud dashboard](https://cloud.livekit.io/) (Project Settings -> API Keys) or your self-hosted LiveKit instance configuration. **Keep this secret.**

-   `NEXT_PUBLIC_LIVEKIT_URL`: Your LiveKit server WebSocket URL.
    *   **Purpose:** Client-side URL to connect to your LiveKit server.
    *   **Example (LiveKit Cloud):** `wss://YOUR_PROJECT_NAME.livekit.cloud`
    *   **Example (Self-hosted):** `ws://your-livekit-domain:7880` (or `wss://` if using SSL)
    *   **Where to get it:** Provided by [LiveKit Cloud](https://cloud.livekit.io/) or based on your self-hosted LiveKit server address.

## Available Scripts

The `package.json` file includes several scripts for managing the application lifecycle. Here are the most common ones:

-   **`dev`**: Starts the Next.js development server.
    -   Command: `npm run dev` or `yarn dev`
    -   Features: Hot reloading, error reporting.
    -   Access: Typically `http://localhost:3000`.
    -   Use this for local development.

-   **`build`**: Builds the application for production.
    -   Command: `npm run build` or `yarn build`
    -   Actions:
        -   Generates the Prisma client (`prisma generate`).
        -   Creates an optimized production build of the Next.js application (`next build`).
    -   Output: `.next` folder.

-   **`start`**: Starts the Next.js production server.
    -   Command: `npm run start` or `yarn start`
    -   Prerequisite: The application must be built using `npm run build` first.
    -   Serves the optimized application from the `.next` folder.

-   **`lint`**: Lints the codebase.
    -   Command: `npm run lint` or `yarn lint`
    -   Action: Uses Next.js's built-in ESLint configuration (`next lint`) to analyze code for potential errors and style issues.

-   **`postinstall`**: This script is run automatically by npm/yarn after the installation of packages.
    -   Action: `prisma generate`
    -   Purpose: Ensures the Prisma Client is generated and up-to-date with your `schema.prisma` file. You usually don't need to run this manually.

## Running the Application

Once you have completed the setup steps:

1.  **Development Mode:**
    To run the application in development mode with hot-reloading:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your web browser to see the application.

2.  **Production Mode:**
    To run the application in production mode, you first need to build it:
    ```bash
    npm run build
    ```
    or
    ```bash
    yarn build
    ```
    Then, start the production server:
    ```bash
    npm run start
    ```
    or
    ```bash
    yarn start
    ```
    The application will be served, typically on `http://localhost:3000` unless configured otherwise (e.g., via environment variables for port).

## Linting

To check the codebase for linting errors and style issues:
```bash
npm run lint
```
or
```bash
yarn lint
```

## Building for Production

To create a production-ready build of the application:
```bash
npm run build
```
or
```bash
yarn build
```
This command compiles the Next.js application and outputs the optimized build artifacts into the `.next` directory.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is currently not licensed. Please add a LICENSE file and update this section if you wish to license it (e.g., MIT License).
