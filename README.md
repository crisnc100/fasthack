# FastHack - Healthy Fast Food App

A React Native app built with Expo that helps users find healthier options at fast food restaurants.

## Features

- 🍔 Discover healthy meal hacks at popular fast food chains
- 📍 Location-based restaurant recommendations
- 🏷️ Dietary preference filtering (Keto, Low-carb, High-protein, etc.)
- ❤️ Save favorite meals
- 👤 Authentication with email/password and Google OAuth
- 💎 Premium features for advanced filtering

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: tRPC with Hono
- **State Management**: Zustand
- **Authentication**: Email/password and Google OAuth
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
   - Copy `.env.example` to `.env`
   - Add your Google OAuth credentials

4. Start the development server:
   ```bash
   npm start
   ```

### Running the App

- **Web**: Press `w` in the terminal or visit the provided localhost URL
- **iOS**: Press `i` to open iOS Simulator
- **Android**: Press `a` to open Android Emulator
- **Physical Device**: Scan the QR code with Expo Go app

## Authentication

The app uses a combination of email/password authentication and Google OAuth:

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password123`

### Google OAuth Setup

To use Google OAuth:

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
2. Configure the OAuth consent screen
3. Create OAuth 2.0 Client IDs for Web and Android/iOS
4. Add the following authorized redirect URIs:
   - `https://auth.expo.io/@your-username/fasthack`
   - `fasthack://`
5. Add your client ID and redirect URI to the `.env` file as:
   - `EXPO_PUBLIC_GOOGLE_CLIENT_ID`
   - `EXPO_PUBLIC_GOOGLE_REDIRECT_URI`

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.