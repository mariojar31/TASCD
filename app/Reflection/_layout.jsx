import React from "react";
import { Stack } from 'expo-router';

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index',
  };

const Reflection = ()=>{


  
  return(
        <Stack>
          <Stack.Screen name="index" options={{headerShown:false}}/> 
          <Stack.Screen name="ReflectionQuiz" options={{headerShown:false, presentation:'containedModal'}}/> 

        </Stack>

  )
}


export default Reflection;
