import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="add-customer" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="notification-settings" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="account-settings" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="billing-settings" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="reminders" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="customer-detail" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="customer-filters" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="listing-filters" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
      <Stack.Screen 
        name="employees" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
    </Stack>
  );
} 