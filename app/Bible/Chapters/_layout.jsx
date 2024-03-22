import React from "react";
import { Stack } from 'expo-router';

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index',
  };

const Chapters = ()=>{


  
  return(
        <Stack>
          <Stack.Screen name="index" options={{headerShown:false}}/> 
          <Stack.Screen name='Verses/index' options={{headerShown:false}}/>
        </Stack>

  )
}


export default Chapters;
