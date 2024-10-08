# YouTube Clone Project

## Project Overview

This project is a development of a YouTube Clone, designed to replicate core functionalities of YouTube while introducing unique features to enhance user engagement and experience. The key features include:

1. **User Points System**: Users earn 5 points for each video watched, with points displayed in their profile.
2. **Custom Video Player**: A video player with gesture-based controls such as double-tap to skip, single-tap to pause, and multi-tap actions for navigation.
3. **VoIP Service**: A feature that allows video calls, screen sharing, and session recording, available from 6 PM to 12 AM.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (for database setup)

### Step 1: Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/KiruOP/Youtube-Clone.git
```

### Step 2: Set Up Environment Variables

Navigate to the `server` folder and create a `.env` file to store environment variables. Use the `.env.example` file as a template:

```bash
cd youtube-clone/server
cp .env.example .env
```

Fill in the required variables in the `.env` file, such as database connection strings and authentication credentials.

### Step 3: Install Node Modules

Next, install the required Node.js packages in both the `client` and `server` directories:

```bash
cd ../client
npm install

cd ../server
npm install
```

### Step 4: Run the Project

To start the project, open two terminal windows or tabs—one for the `client` and one for the `server`—and run the following command in each:

```bash
npm start
```

This will start both the frontend and backend servers.

### Step 5: Add Database

Ensure your MongoDB server is running. The application will connect to the database specified in the `.env` file. If needed, create a new database for this project and update the `.env` file with the appropriate connection string.

### Step 6: Add Authentication Client ID

To enable authentication features, provide a valid client ID. Add client ID to this path 
```bash
cd ../client/src/index.js
```

## Conclusion

This YouTube clone project demonstrates full-stack development skills, incorporating user engagement features, custom video controls, and a time-restricted VoIP service. Follow the steps above to set up the project on your local machine and explore its functionalities.

For any issues or contributions, feel free to open an issue or submit a pull request!
