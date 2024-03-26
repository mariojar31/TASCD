import React, { useEffect, useState, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/index.js';
import { useNavigation, Link, Redirect, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from "expo-status-bar";

import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import HeaderRightCustome from '../../components/HeaderRightCustome/index.jsx';
import styles from './styles.js';

const BookMarks = ()=>{
    const navigation = useNavigation();
    const [bookMarksChapters, setBookMarksChapters]= useState([]);
    const [bookMarksVerses, setBookMarksVerses]= useState([]);
    const [version, setVersion]=useState(null);

    useEffect(() => {
        const getParams = async () => {
          try {
            const bookMarksListChapter = await AsyncStorage.getItem('BookMarks_chapters');
            const bookMarksListVerses = await AsyncStorage.getItem('BookMarks_verses');
            const bibleVersion = await AsyncStorage.getItem('bibleVersion');

            if(bookMarksListChapter){
              setBookMarksChapters(JSON.parse(bookMarksListChapter));
            }
            if(bookMarksListVerses){
              setBookMarksVerses(JSON.parse(bookMarksListVerses));
            }
            if(bibleVersion){
              setVersion(bibleVersion);
            }

          } catch (error) {
            console.error('Error: ', error);
          }
        };
    
        getParams();
      }, []);

      useEffect(() => {
        const updateBookMarks = async () => {
            try {
                const bookMarksListChapter = await AsyncStorage.getItem('BookMarks_chapters');
                const bookMarksListVerses = await AsyncStorage.getItem('BookMarks_verses');

                if (bookMarksListChapter) {
                    setBookMarksChapters(JSON.parse(bookMarksListChapter));
                }
                if (bookMarksListVerses) {
                    setBookMarksVerses(JSON.parse(bookMarksListVerses));
                }
            } catch (error) {
                console.error('Error updating book marks: ', error);
            }
        };

        const listener = navigation.addListener('focus', () => {
            updateBookMarks();
        });

        return () => {
            listener();
        };
    }, [navigation]);

      useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTintColor: COLORS.secondarylight,
          headerTitle: `Marcadores Guardados`,
          headerTitleStyle: { color: COLORS.secondarylight },
          headerRight: () => <HeaderRightCustome menuDots={true} bookMarks={false} marks={false} isMarked={false} onPressMark={()=>null} />,
          headerStyle: { backgroundColor: "beige" }
        });
      }, [navigation]);

      

      const handlePress =(header)=>{
        console.log(header);

          router.push(`BookMarks/ViewMark?version=${version}&ref=${header}`);
        
      }

      
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: 'beige', marginTop: StatusBar.currentHeight || 0 }}>
            <View style={styles.container}>

                <ScrollView style={styles.List}>
                    {bookMarksVerses.length!==0? bookMarksVerses.map((mark, index)=><Pressable onPress={()=>handlePress(mark.header)} key={index} style={styles.Pressable}><Text style={styles.textItem}>{mark.header}</Text></Pressable>):<Text>Sin Versos Marcados</Text>}
                    {bookMarksChapters.length!==0? bookMarksChapters.map((mark,index)=><Pressable onPress={()=>handlePress(mark.header)} key={index} style={styles.Pressable}><Text style={styles.textItem}>{mark.header}</Text></Pressable>):<Text>Sin Capitulos Marcados</Text>}

                </ScrollView>    
            </View>
        </SafeAreaView>

    )
}

export default BookMarks;