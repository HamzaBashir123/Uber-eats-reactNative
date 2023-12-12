import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
// import OrderCompleted from "./screens/OrderCompleted";

const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: true,
  };

  return (
    <ReduxProvider store={store}>
      <SafeAreaView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          {/* <Stack.Screen name="OrderCompleted" component={OrderCompleted} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
     </ReduxProvider>
  );
}