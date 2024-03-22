import React from "react";
import { Stack } from 'expo-router';

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index',
  };

const Bible = ()=>{


  
  return(
        <Stack>
            <Stack.Screen name='Chapters' options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name='index' options={{headerShown:false}}></Stack.Screen>
        </Stack>
    //   <Stack>
    //     <Stack.Screen name='index' options={{headerShown: false}}></Stack.Screen>
    //     <Stack.Screen name='Bible' options={{headerShown: false}}></Stack.Screen>
    //     <Stack.Screen name='BibleChapters' options={{headerShown: true}}></Stack.Screen>
    //     <Stack.Screen name='ChapterVerses' options={{headerShown: true}}></Stack.Screen>

    //   </Stack>
  )
}


export default Bible;
