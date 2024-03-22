import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { getVerse } from '../../api/index.js';
import styles from "./styles.js";
import { COLORS } from '../../constants/index.js';
import HeaderRightCustome from '../../components/HeaderRightCustome/index.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ViewMark = () => {
    const navigation = useNavigation();
    const { version, ref } = useLocalSearchParams();

    const [verses, setVerses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [header, setHeader] = useState('');
    const [book, setBook] = useState('');
    const [chapter, setChapter] = useState('');
    const [verses_, setVerses_] = useState('');
    const [currentBook, setCurrentBook]=useState(null);
    const [currentChapter, setCurrentChapter]=useState(null);
    const [isMarked, setIsMarked]=useState(true);
    const [bookMarksChapters, setBookMarksChapters]=useState([]);
    const [bookMarksVerses, setBookMarksVerses]=useState([]);

    const setParams = (ref) => {
        const splitText = ref.split(' ');
        let newBook = '';
        let newChapter = '';
        let newVerses = '';
    
        if (splitText.length === 2) {
            newBook = splitText[0];
            newChapter = splitText[1];
            newVerses = '';
        } else if (splitText.length === 3) {
            if (/^\d+$/.test(splitText[0])) {
                newBook = `${splitText[0]} ${splitText[1]}`;
                newChapter = splitText[2];
                newVerses = '';
            } else {
                newBook = splitText[0];
                newChapter = splitText[1];
                const versesNum = splitText[2];
                if (versesNum) {
                    const splitVersesNum = versesNum.split(',');
                    if (splitVersesNum.length > 1) {
                        const finalVers = splitVersesNum.length - 1;
                        newVerses = `${splitVersesNum[0]}-${splitVersesNum[finalVers]}`;
                    }else{
                        newVerses=splitVersesNum[0];
                    }
                }
            }
        } else {
            newBook = `${splitText[0]} ${splitText[1]}`;
            newChapter = splitText[2];
            const versesNum = splitText[3];
            if (versesNum) {
                const splitVersesNum = versesNum.split(',');
                if (splitVersesNum.length > 1) {
                    const finalVers = splitVersesNum.length - 1;
                    newVerses = `${splitVersesNum[0]}-${splitVersesNum[finalVers]}`;
                }
            }
        }
    
        setBook(newBook);
        setChapter(newChapter);
        setVerses_(newVerses);
        return newVerses;
    };


    useEffect(() => {    
        setParams(ref);
        getParams();
    }, [ref]);

    const setBookMark = ()=>{
        if(isMarked==true){
            console.log('remove');
            removeBookMark();
            setIsMarked(!isMarked);
        }else{
            console.log('add');
            addBookMark();
            setIsMarked(!isMarked);

        }
    }

    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTintColor: COLORS.secondarylight,
          headerTitle: ref,
          headerTitleStyle: { color: COLORS.secondarylight },
          headerRight: () => <HeaderRightCustome menuDots={true} bookMarks={false} marks={false} addMark={true} isMarked={isMarked} onPressMark={setBookMark} />,
          headerStyle: { backgroundColor: "beige" }
        });
      }, [navigation,isMarked]);

      const getParams = async () => {
        try {
          const bookMarksListChapter = await AsyncStorage.getItem('BookMarks_chapters');
          const bookMarksListVerses = await AsyncStorage.getItem('BookMarks_verses');
  
          if(bookMarksListChapter){
            setBookMarksChapters(JSON.parse(bookMarksListChapter));
          }
          if(bookMarksListVerses){
            setBookMarksVerses(JSON.parse(bookMarksListVerses));
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      };
      
    useEffect(() => {

        getParams();
      }, []);


    const saveParams = async(book,chapter)=>{
        try {
            await AsyncStorage.setItem('currentBook', book);
            await AsyncStorage.setItem('currentChapter', chapter);
          } catch (error) {
            console.error('Error saving params:', error);
          }
        };

    const saveVerses = async(book,chapter,verses_,data)=>{
        try{
            await AsyncStorage.setItem(`${version}_${book}_${chapter}${verses_!==''?`_${verses_}`:verses_}`,JSON.stringify(data));
        }catch(error){
            console.error('Error saving verses: ',error);
        }
    };

    const addBookMark = async () => {
        const newMark = { header: `${book} ${chapter}${verses_!==''?` ${verses_}`:verses_}`};
        console.log(newMark);
        try {
          if(verses_!==''){
            setBookMarksVerses(prevMarks => [...prevMarks, newMark]);
          }else{
            setBookMarksChapters(prevMarks => [...prevMarks, newMark]);
          }
          
          await AsyncStorage.setItem((verses_!=='')?('BookMarks_verses'):('BookMarks_chapters'), JSON.stringify(verses_!==''? [...bookMarksVerses, newMark]:[...bookMarksChapters, newMark]));
          setIsMarked(true); // Marcar inmediatamente después de agregar un marcador
        } catch (error) {
          console.error('Error adding bookmark: ', error);
        }
      };
      
      const removeBookMark = async () => {
        const versesNum =setParams(ref);
        
        try {
            const marksList = versesNum!==''?
            await AsyncStorage.getItem('BookMarks_verses'):
            await AsyncStorage.getItem('BookMarks_chapters');
            if(marksList){
                const filteredMarks = JSON.parse(marksList).filter(mark => mark.header !== ref);
                await AsyncStorage.setItem(versesNum!==''?'BookMarks_verses':'BookMarks_chapters', JSON.stringify(filteredMarks));
                
                if(versesNum!==''){ 
                    setBookMarksVerses(filteredMarks);
                }else{
                    setBookMarksChapters(filteredMarks);
                    }
                setIsMarked(false); // Desmarcar inmediatamente después de quitar un marcador
            }

        } catch (error) {
          console.error('Error removing bookmark:', error);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            let versess = [];

            if (version && book && chapter !== null) {
                try {
                    const data = await AsyncStorage.getItem(`${version}_${book}_${chapter}${verses_!==''?`_${verses_}`:verses_}`);
                    if(data){
                        if (Array.isArray(JSON.parse(data))) {
                            versess = JSON.parse(data).map(verse => verse.verse);
                        } else {
                            versess = [JSON.parse(data).verse];
                        }                        
                        setVerses(versess);
                        setHeader(null);
                        setIsLoading(false);

                    }else{
                        const data = await getVerse(version, book, chapter, verses_);

                        if(verses_!==''){
                            const dataVerses = data.text;
                            const header = null;
                            saveVerses(book,chapter,verses_,dataVerses);

    
                            if (Array.isArray(dataVerses)) {
                                versess = dataVerses.map(verse => verse.verse);

                            } else {
                                versess = [dataVerses.verse];
                            }
    
                            setHeader(header);
                        }else{
                            const dataVerses = data.verses;
                            const header = data.header;
                            saveVerses(book,chapter,verses_,dataVerses);
                            
                            versess= dataVerses.map(verse => verse.verse);
    
                            setHeader(header);
                        }
    
                        setVerses(versess);
                        setIsLoading(false);
                    }

                    saveParams(book,chapter);
                    
                    

                } catch (error) {
                    console.error('Error fetching data: ', error);
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [version, book, chapter, verses_]);

    const viewFullChapter = ()=>{
        router.push('Bible/Chapters/Verses');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light, marginTop: StatusBar.currentHeight || 0 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.h1}>{header?header:''}</Text>
                <ScrollView contentContainerStyle={styles.VersesList}>
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : (verses.slice(0,4).map((verse, index) => (
                            <Text style={styles.VersesItem} key={index}>{verse}</Text>
                        ))
                    )}
                    <View style={styles.ButtonContainer}>
                        <Pressable onPress={viewFullChapter} style={({pressed})=>[pressed?styles.btnPressed:styles.btnCustom]}>
                            <Text style={styles.Button}>
                                Ver Capitulo Completo
                            </Text>
                        </Pressable>
                    </View>
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default ViewMark;