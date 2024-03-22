import React, { useEffect, useState, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../constants/index.js';
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from 'expo-router';
import { getChapters } from '../../../api/index.js';
import HeaderRightCustome from '../../../components/HeaderRightCustome/index.jsx';
import styles from "./styles.js";

const Chapters = () => {
  const navigation = useNavigation();
  const [chaptersList, setChaptersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentBook, setCurrentBook] = useState(null); // Definir currentBook como estado

  useLayoutEffect(() => {
    // Asegurarse de que currentBook esté definido antes de usarlo
    if (currentBook) {
      navigation.setOptions({
        headerShown: true,
        headerTintColor: COLORS.secondarylight,
        headerTitle: currentBook,
        headerTitleStyle: { color: COLORS.secondarylight },
        headerRight: () => <HeaderRightCustome menuDots={true} bookMarks={true} marks={false} isMarked={true} />,
        headerStyle: { backgroundColor: "beige" }
      });
    }
  }, [navigation, currentBook]);

  useEffect(() => {
    const getParams = async () => {
      try {
        const currentVersion = await AsyncStorage.getItem('bibleVersion');
        const currentBook = await AsyncStorage.getItem('currentBook');
        setCurrentBook(currentBook); // Establecer currentBook en el estado
        await getChaptersList(currentVersion, currentBook);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    getParams();
  }, []);

  
  const saveCurrentChapter = async(chapter)=>{
    try {
        await AsyncStorage.setItem('currentChapter', chapter);
      } catch (error) {
        console.error('Error saving current chapter:', error);
      }
}

  const chapterSelect = (chapter) => {
    setCurrentChapter(chapter);
    saveCurrentChapter(chapter)
    navigation.navigate('Verses/index');
  };

  const getChaptersList = async (version, book) => {
    try {
      const storedChaptersList = await AsyncStorage.getItem(`${version}_${book}`);
      if (storedChaptersList) {
        setChaptersList(JSON.parse(storedChaptersList));
        setIsLoading(false);
      } else {
        const data = await getChapters(version, book);
        setChaptersList(data);
        await AsyncStorage.setItem(`${version}_${book}`, JSON.stringify(data));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error: ", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
        marginTop: StatusBar.currentHeight || 0,
      }}>
      <View style={styles.chaptersList}>
        {isLoading ? (<Text>Loading</Text>) : (
          chaptersList && chaptersList.map(chapter => ( // Comprobación para chaptersList
            <Pressable style={styles.chapterItem} key={chapter} onPress={() => chapterSelect(chapter)}>
              <Text style={styles.chapterText}>{chapter}</Text>
            </Pressable>
          ))
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chapters;