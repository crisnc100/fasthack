# FastHack - Healthy Fast Food App

A React Native app built with Expo that helps users find healthier options at fast food restaurants.

## Features

- 🍔 Discover healthy meal hacks at popular fast food chains
- 📍 Location-based restaurant recommendations
- 🏷️ Dietary preference filtering (Keto, Low-carb, High-protein, etc.)
- ❤️ Save favorite meals
- 👤 Mock authentication system with Google OAuth simulation
- 💎 Premium features for advanced filtering

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: tRPC with Hono
- **State Management**: Zustand
- **Authentication**: Mock authentication system (no external dependencies)
- **Styling**: React Native StyleSheet
- **Icons**: Lucide React Native

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator (for mobile testing)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Running the App

- **Web**: Press `w` in the terminal or visit the provided localhost URL
- **iOS**: Press `i` to open iOS Simulator
- **Android**: Press `a` to open Android Emulator
- **Physical Device**: Scan the QR code with Expo Go app

## Authentication

The app uses a simplified mock authentication system that simulates real OAuth flows:

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password123`

### Features
- Email/password authentication (mock implementation)
- Google OAuth simulation (no external setup required)
- Profile setup flow for new users
- Persistent sessions with AsyncStorage

### Google OAuth Simulation
The "Continue with Google" button simulates a real OAuth flow:
- On web: Returns a mock Google user after 1.5s delay
- On mobile: Simulates mobile OAuth flow
- No external configuration needed for testing

Any email/password combination will work for testing, but the demo credentials above will give you a pre-configured user.

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   ├── auth/              # Authentication screens
│   └── _layout.tsx        # Root layout
├── backend/               # tRPC backend
│   └── trpc/              # tRPC routes
├── components/            # Reusable components
├── constants/             # App constants
├── mocks/                 # Mock data
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

## Backend

The app includes a tRPC backend that provides:
- Meal data endpoints
- Restaurant information
- Type-safe API calls
- Fallback to mock data

## Real Google OAuth Implementation

To implement real Google OAuth:

1. Set up Google OAuth credentials in Google Cloud Console
2. Add the credentials to your environment variables
3. Replace the mock `mockGoogleAuth` function in `store/authStore.ts` with real OAuth implementation using `expo-web-browser`
4. Update the app.config.js with proper OAuth redirect URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.