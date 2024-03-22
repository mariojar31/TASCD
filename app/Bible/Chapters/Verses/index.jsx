import React, { useEffect, useState, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../../constants/index.js';
import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useNavigation } from 'expo-router';
import { getVersesList } from '../../../../api/index.js';
import HeaderRightCustome from '../../../../components/HeaderRightCustome/index.jsx';
import FloatMenu from '../../../../components/FloatMenuOptions/index.jsx';
import styles from "./styles.js";


const Verses = () => {
  const navigation = useNavigation();
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [chapterVerses, setChapterVerses] = useState([]);
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [selectedVersesId, setSelectedVersesId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shownFloatMenu, setShownFloatMenu] = useState(false);
  const [bookMarksChapters, setBookMarksChapters]= useState([]);
  const [bookMarksVerses, setBookMarksVerses]= useState([]);
  const [isMarked, setIsMarked]= useState(false);
  const [highlightedVerse, setHighlightedVerse] = useState(null);

  const unselect = ()=>{
    setSelectedVerses([]);
    setSelectedVersesId([]);
  }

  
  useEffect(() => {
    const getParams = async () => {
      try {
        const currentVersion = await AsyncStorage.getItem('bibleVersion');
        const currentBook = await AsyncStorage.getItem('currentBook');
        const currentChapter = await AsyncStorage.getItem('currentChapter');
        const bookMarksListChapter = await AsyncStorage.getItem('BookMarks_chapters');
        const bookMarksListVerses = await AsyncStorage.getItem('BookMarks_verses');


        setCurrentBook(currentBook);
        setCurrentChapter(currentChapter);
        if(bookMarksListChapter){
          setBookMarksChapters(JSON.parse(bookMarksListChapter));
        }
        if(bookMarksListVerses){
          setBookMarksVerses(JSON.parse(bookMarksListVerses));
        }
        await getChapterVerses(currentVersion, currentBook, currentChapter);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    getParams();
  }, [currentChapter]);

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      console.log(hash)
      const element = document.getElementById(hash.substring(1)); // Elimina el '#' del hash
      setHighlightedVerse(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: COLORS.secondarylight,
      headerTitle: `${currentBook} ${currentChapter}`,
      headerTitleStyle: { color: COLORS.secondarylight },
      headerRight: () => <HeaderRightCustome menuDots={true} bookMarks={false} marks={true} isMarked={isMarked} onPressMark={setMark} />,
      headerStyle: { backgroundColor: "beige" }
    });
  }, [navigation, currentBook, currentChapter, isMarked]);

  useEffect(() => {
    const isShownFloatMenu = () => {
      setShownFloatMenu(selectedVerses.length !== 0);
    };

    isShownFloatMenu();
  }, [selectedVerses]);

  const addBookMark = async () => {
    const newMark = { header: `${currentBook} ${currentChapter}`};
    try {
      setBookMarksChapters(prevMarks => [...prevMarks, newMark]);
      await AsyncStorage.setItem('BookMarks_chapters', JSON.stringify([...bookMarksChapters, newMark]));
      setIsMarked(true); // Marcar inmediatamente después de agregar un marcador
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };
  
  const removeBookMark = async () => {
    const headerToRemove = `${currentBook} ${currentChapter}`;
    try {
      const filteredMarks = bookMarksChapters.filter(mark => mark.header !== headerToRemove);
      await AsyncStorage.setItem('BookMarks_chapters', JSON.stringify(filteredMarks));
      setBookMarksChapters(filteredMarks);
      setIsMarked(false); // Desmarcar inmediatamente después de quitar un marcador
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const setMark= ()=>{
    if(isMarked==true){
      removeBookMark();
      setIsMarked(!isMarked);
    }else{
      addBookMark();
      setIsMarked(!isMarked);
    }
  }
  
  const nextChapter = async()=>{
    const Chapter = parseInt(currentChapter);
    try{
      await AsyncStorage.setItem('currentChapter',Chapter+1);
      setCurrentChapter(Chapter+1);

    }catch(error){

    }
  }

  const prevChapter = async()=>{
    const Chapter = parseInt(currentChapter);
    try{
      if(Chapter!==1){
        await AsyncStorage.setItem('currentChapter',Chapter-1);
        setCurrentChapter(Chapter-1);
      }
    }catch(error){

    }
  }

  useEffect(() => {
    const isInBookMarks = () => {
      const bookMarkHeader = `${currentBook} ${currentChapter}`;
  
      if (bookMarksChapters) {
        const marked = bookMarksChapters.some(mark => mark.header === bookMarkHeader);
    
        setIsMarked(marked);
      }
    };
  
    isInBookMarks();
  }, [bookMarksChapters, currentBook, currentChapter]);

  
  const handlePressVerse = (selectedVerse, id, isSelected) => {
    setSelectedVerses(prevSelected =>
      isSelected
        ? prevSelected.filter(verse => verse !== selectedVerse)
        : [...prevSelected, selectedVerse]
    );
    setSelectedVersesId(prevSelected =>
      isSelected
        ? prevSelected.filter(verseId => verseId !== id)
        : [...prevSelected, id]);
  };

  const PressableVerse = ({ verse, id }) => {
    const isSelected = selectedVerses.includes(verse);

    const handlePress = () => {
      handlePressVerse(verse, id, isSelected);
    };

    return (
      <Pressable onPress={handlePress}>
        <Text id={id} style={isSelected ? styles.verseItemSelected : highlightedVerse==id ? styles.highlightedVers : styles.VersesItem}>
          {verse}
        </Text>
      </Pressable>
    );
  };

  const saveChapterVerses = async (version, book, chapter, verses) => {
    try {
      await AsyncStorage.setItem(`${version}_${book}_${chapter}`, JSON.stringify(verses));
      setChapterVerses(verses);
      setIsLoading(false);
    } catch (error) {
      console.error('Error saving chapter verses:', error);
    }
  };

  const getChapterVerses = async (version, book, chapter) => {
    try {
      const storedChapterVerses = await AsyncStorage.getItem(`${version}_${book}_${chapter}`);

      if (storedChapterVerses) {
        try {
          const parsedVerses = JSON.parse(storedChapterVerses);
          if (Array.isArray(parsedVerses)) {
            setChapterVerses(parsedVerses);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error parsing stored chapter verses:', error);
        }
      }

      const verses = await getVersesList(version, book, chapter);
      if (verses) {
        saveChapterVerses(version, book, chapter, verses);
      }
    } catch (error) {
      console.error("Error getting chapter verses:", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light, marginTop: StatusBar.currentHeight || 0 }}>
      <View style={{ height: "85vh" }}>
        <FloatMenu shown={shownFloatMenu} selectedVerses={selectedVerses} selectedVersesId={selectedVersesId} unselect={unselect} />
        <ScrollView contentContainerStyle={styles.VersesList}>
          {isLoading ? <Text>Loading</Text> : (
            chapterVerses.map(verse =>
              <PressableVerse key={verse.id} id={verse.id} verse={verse.verse} />
            )
          )}
          <View style={{display:"flex",flexDirection:"row", alignItems:"center", justifyContent:"center", alignContent:"center",width:"100%"}}>
            <View style={styles.ButtonContainer}>
                <Pressable onPress={prevChapter} style={({pressed})=>[pressed?styles.btnPressed:styles.btnCustom]}>
                    <Text style={styles.Button}>
                      {'<'}
                    </Text>
                </Pressable>
            </View>
            <Pressable onPress={()=>navigation.goBack()}>
              <Text style={{color:COLORS.secondarylight}}>
                Capítulo {currentChapter}
              </Text>
            </Pressable>
            <View style={styles.ButtonContainer}>
                <Pressable onPress={nextChapter} style={({pressed})=>[pressed?styles.btnPressed:styles.btnCustom]}>
                    <Text style={styles.Button}>
                      {'>'}
                    </Text>
                </Pressable>
            </View> 
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Verses;