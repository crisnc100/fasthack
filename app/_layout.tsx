import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "@/constants/colors";

import { ErrorBoundary } from "./error-boundary";

// tRPC and React Query setup
import { trpc, trpcClient } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Create a client for React Query
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  const { initialize } = useAuthStore();
  const [initStarted, setInitStarted] = useState(false);

  useEffect(() => {
    // Initialize auth state with better error handling
    if (!initStarted) {
      setInitStarted(true);
      
      const initAuth = async () => {
        try {
          console.log('Starting auth initialization...');
          await initialize();
          console.log('Auth initialization completed');
        } catch (error) {
          console.error('Auth initialization failed:', error);
          // Continue anyway - app should still work without auth
        }
      };
      
      // Don't block the app startup
      initAuth();
    }
  }, [initStarted, initialize]);

  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      console.log('Fonts loaded, hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <RootLayoutNav />
        </QueryClientProvider>
      </trpc.Provider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { session, profile, isLoading, isInitialized } = useAuthStore();

  // Handle auth state changes with better logic
  useEffect(() => {
    // Don't do anything until auth is initialized
    if (!isInitialized) {
      console.log('Auth not initialized yet, waiting...');
      return;
    }
    
    // Don't redirect while loading
    if (isLoading) {
      console.log('Auth still loading, waiting...');
      return;
    }

    const inAuthGroup = segments[0] === 'auth';
    const currentAuthRoute = segments.length > 1 ? segments[1] : null;
    
    console.log('Auth routing check:', { 
      hasSession: !!session, 
      hasProfile: !!profile, 
      profileSetupComplete: profile?.has_completed_setup,
      inAuthGroup,
      currentAuthRoute,
      segments: segments.join('/'),
      isInitialized,
      isLoading
    });
    
    // Add a small delay to prevent rapid redirects
    setTimeout(() => {
      if (!session && !inAuthGroup) {
        // Redirect to login if not authenticated
        console.log('Redirecting to login - no session');
        router.replace('/auth/login');
      } else if (session && profile?.has_completed_setup && inAuthGroup) {
        // Redirect to home if authenticated and profile is complete
        console.log('Redirecting to home - authenticated with complete profile');
        router.replace('/');
      } else if (session && profile && !profile.has_completed_setup && currentAuthRoute !== 'profile-setup') {
        console.log('Redirecting to profile setup - incomplete profile');
        router.replace('/auth/profile-setup');
      }
    }, 100);
  }, [session, profile, segments, isLoading, isInitialized, router]);

  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: colors.primary,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="meal/[id]" 
        options={{ 
          title: "Meal Details",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="restaurant/[id]" 
        options={{ 
          title: "Restaurant",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="premium" 
        options={{ 
          title: "Premium",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="auth/login" 
        options={{ 
          headerShown: false,
          animation: 'fade',
        }} 
      />
      <Stack.Screen 
        name="auth/register" 
        options={{ 
          headerShown: false,
          animation: 'fade',
        }} 
      />
      <Stack.Screen 
        name="auth/profile-setup" 
        options={{ 
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false,
        }} 
      />
      <Stack.Screen 
        name="auth/callback" 
        options={{ 
          headerShown: false,
          animation: 'fade',
        }} 
      />
    </Stack>
  );
}