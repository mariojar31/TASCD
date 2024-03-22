import { View, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';
import React, { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';



const HeaderRightCustome = ({menuDots,marks,bookMarks, addMark, isMarked, onPressMark})=>{
    
    const navigation = useNavigation();
    const menuDotsShown = menuDots;
    const marksShown = marks;
    const bookMarksShown = bookMarks;
    const addMarkShown = addMark;
    const marked = isMarked;

    return(
      <View style={{flexDirection: "row"}}>
        <Pressable onPress={()=>navigation.navigate('BookMarks/index')}>
          <Entypo style={bookMarksShown==true?styles.iconVisible:styles.iconHide} name="bookmarks" size={24} color="black" />
        </Pressable>
        <Pressable onPress={()=>onPressMark()}>
        <FontAwesome style={marksShown==true?styles.iconVisible:styles.iconHide} name={marked==true?"bookmark":"bookmark-o"} size={24} color="black" />
        </Pressable>
        <MaterialIcons onPress={()=>onPressMark()} style={addMarkShown==true?styles.iconVisible:styles.iconHide} name={marked===true?"bookmark-remove":"bookmark-add"} size={24} color="black" />
        <Pressable onPress={()=>console.log("Menu is pressed")}>
          <Entypo style={menuDotsShown==true?styles.iconVisible:styles.iconHide} name="dots-three-horizontal" size={24} color="black" />
        </Pressable>
      </View>
      )
      
    } 

    export default HeaderRightCustome;