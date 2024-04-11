
import Passwords from "./components/passwords.js"
import One from "./components/one.js"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();




  export default function App() {

    return (

         <NavigationContainer>
                  <Stack.Navigator>
               
                  <Stack.Screen name="Passwords" component={Passwords} options={{headerShown: false}} />  
                      
                        <Stack.Screen name="One" component={One} options={{headerShown: true}} />
                       
                  </Stack.Navigator>
              </NavigationContainer>
        
      
    


     
      
           
      
    );
  
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  }
});