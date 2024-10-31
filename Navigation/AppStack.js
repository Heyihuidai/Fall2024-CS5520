import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Home from "../components/Home";
import Profile from "../components/Profile";
import GoalDetails from "../components/GoalDetails";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'purple',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "All My Goals",
          headerRight: () => (
            <Pressable 
              onPress={() => navigation.navigate('Profile')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 15,
              })}
            >
              <Ionicons name="person-circle-outline" size={24} color="white" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ route }) => ({
          title: route.params ? route.params.goalData.text : "More Details",
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
        }}
      />
    </Stack.Navigator>
  );
}