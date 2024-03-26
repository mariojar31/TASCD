import React from "react";
import { Stack } from 'expo-router';

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index',
  };

const App = ()=>{


  
  return(
        <Stack>
            <Stack.Screen name='index'/>
            <Stack.Screen name='Bible' options={{headerShown: false}} />
            <Stack.Screen name="BookMarks/index" options={{headerShown: false}}/>
            <Stack.Screen name='BookMarks/ViewMark' options={{presentation:'modal', headerShown:false}}/>
            <Stack.Screen name='Reflection' options={{headerShown: false}} />
            <Stack.Screen name="MySpaceWG/index" options={{headerShown: false}}/>

        </Stack>

  )
}


export default App;
