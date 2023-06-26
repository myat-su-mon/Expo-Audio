import Record from "./screens/Record";
import { ContextProvider } from "./context/ContextProvider";
import Replay from "./screens/Replay";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Record" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Record" component={Record} />
          <Stack.Screen name="Replay" component={Replay} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}