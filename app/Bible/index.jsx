import React from 'react';
import {useEffect, useState, useLayoutEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SIZES, FONT} from '../../constants/index.js';
import {
    View,
    Text,
    Image,
    ImageBackground,
    SafeAreaView,
    Button,
    Pressable,
    Alert,
    FlatList,
    ScrollView
  } from "react-native";

import CustomSelect from '../../components/customSelect/index.jsx';

import styles_bible from "./styles_bible.js";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from 'expo-router';

import { getVerse, getBooks } from '../../api/index.js';

import HeaderRightCustome from '../../components/HeaderRightCustome/index.jsx';

const Bible = () =>{
    const navigation = useNavigation();

    useLayoutEffect(()=>{
    navigation.setOptions({headerShown: true, headerTintColor:COLORS.secondarylight, headerTitle: "Santa Biblia", headerTitleStyle: {color: COLORS.secondarylight} ,headerRight: ()=><HeaderRightCustome menuDots={true} bookMarks={true} marks={false} isMarked={true}/>, headerStyle:{backgroundColor: "beige"}});
    },[navigation]);

    const listVersions = ['RVR1960','SBDJ'];
    const [bibleVersion, setBibleVersion]= useState(listVersions[0]);

    const [isLoading, setIsLoading] = useState(true);   
    const [bookList, setBookList] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [chaptersList, setChaptersList] = useState(null);
    const [currentChapter, setCurrentChapter]= useState(null);
    const [textChapter, setTextChapter]= useState(null);

    const bookSelect = async(book)=>{
        setCurrentBook(book);
        await saveCurrentBook(book);
        navigation.navigate('Chapters');
    }

    const saveBibleVersion = async (version) => {
        try {
          await AsyncStorage.setItem('bibleVersion', version);
        } catch (error) {
          console.error('Error saving bible version:', error);
        }
      };

      const saveCurrentBook = async(book)=>{
        try {
            await AsyncStorage.setItem('currentBook', book);
          } catch (error) {
            console.error('Error saving current book:', error);
          }
    }

    const handleSelectChange = async(selectedItem, index)=>{
        setBibleVersion(selectedItem);
        await saveBibleVersion(selectedItem);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedVersion = await AsyncStorage.getItem('bibleVersion');
                let storedBooks = null;
    
                // Verificar si los libros están almacenados en AsyncStorage
                if (storedVersion) {
                    storedBooks = await AsyncStorage.getItem(`${storedVersion}_books`);
                }else{
                    await saveBibleVersion(bibleVersion)
                }
    
                if (storedBooks) {
                    // Si los libros están disponibles en AsyncStorage, usarlos
                    setBibleVersion(storedVersion);
                    setBookList(JSON.parse(storedBooks));
                    setIsLoading(false);
                } else {
                    // Si los libros no están en AsyncStorage o la versión cambió, obtener los libros de la API
                    const data = await getBooks(storedVersion || bibleVersion);
                    setBibleVersion(storedVersion || bibleVersion);
                    setBookList(data);
                    setIsLoading(false);
    
                    // Almacenar los nuevos libros en AsyncStorage
                    await AsyncStorage.setItem(`${storedVersion || bibleVersion}_books`, JSON.stringify(data));
                }
            } catch (error) {
                console.error('Error fetching stored version:', error);
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [bibleVersion]);

    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: COLORS.light,
            marginTop: StatusBar.currentHeight || 0,
            }}>                
                <View style={{margin: "2vw"}}>
                    <CustomSelect onSelectChange={handleSelectChange} optionList={listVersions} defaultValue={bibleVersion}></CustomSelect>
                </View>
                <View style={{height:"75vh"}}>
                    <ScrollView style={styles_bible.bookList}>
                        {bookList.map(book=>{
                            return (
                                <Pressable onPress={()=>bookSelect(book)} key={book}>
                                    <Text style={styles_bible.bookPressable}>
                                        {book}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </ScrollView>
                </View>

                
        </SafeAreaView>

    ); 
};

export default Bible;


