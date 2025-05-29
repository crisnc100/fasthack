# FastHack - Healthy Fast Food App

A React Native app built with Expo that helps users find healthier options at fast food restaurants.

## Features

- 🍔 Discover healthy meal hacks at popular fast food chains
- 📍 Location-based restaurant recommendations
- 🏷️ Dietary preference filtering (Keto, Low-carb, High-protein, etc.)
- ❤️ Save favorite meals
- 👤 User authentication with Google OAuth
- 💎 Premium features for advanced filtering

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: tRPC with Hono
- **State Management**: Zustand
- **Authentication**: Google OAuth with expo-auth-session
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

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
4. Configure Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your client ID to `.env` file

5. Start the development server:
   ```bash
   npm start
   ```

### Running the App

- **Web**: Press `w` in the terminal or visit the provided localhost URL
- **iOS**: Press `i` to open iOS Simulator
- **Android**: Press `a` to open Android Emulator
- **Physical Device**: Scan the QR code with Expo Go app

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

## Authentication

The app uses a simplified authentication system with:
- Email/password authentication (mock implementation)
- Google OAuth integration
- Profile setup flow for new users
- Persistent sessions with AsyncStorage

## Backend

The app includes a tRPC backend that provides:
- Meal data endpoints
- Restaurant information
- Type-safe API calls
- Fallback to mock data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.