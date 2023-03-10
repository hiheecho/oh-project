import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stacks from "../navigation/Stacks";
import Tabs from "../navigation/Tabs";

const Nav = createNativeStackNavigator();

export default function Root() {
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stacks" component={Stacks} />
    </Nav.Navigator>
  );
}
