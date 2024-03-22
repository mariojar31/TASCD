import {View,Pressable} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import styles from './styles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FloatMenu = ({shown, selectedVerses, selectedVersesId, unselect})=>{

  const [currentBook, setCurrentBook]=useState(null);
  const [currentChapter, setCurrentChapter]=useState(null);
  const [bookMarks, setBookMarks]= useState([]);

  useEffect(() => {
    const getParams = async () => {
      try {
        const currentBook = await AsyncStorage.getItem('currentBook');
        const currentChapter = await AsyncStorage.getItem('currentChapter');
        const bookMarksList = await AsyncStorage.getItem('BookMarks_verses');
        setCurrentBook(currentBook);
        setCurrentChapter(currentChapter);
        if(bookMarksList){
          setBookMarks(JSON.parse(bookMarksList));
        }
        
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    getParams();
  }, []);

    const copyToClipboard = ()=>{
      const verses = selectedVerses.sort();
      const versesToCopy = verses.join('\n');
      Clipboard.setString(versesToCopy);
      // Toast.show('Elemento Copiado',{duration:Toast.durations.SHORT,position:Toast.positions.CENTER, shadow:true, animation:true, backgroundColor:"rgba(0,0,0,0.5)", textColor:"white"});
      console.log("Elemento Copiado");
      unselect();
    }

    const saveBookMark = async () => {
      // const versesSelected = selectedVerses.sort();
      // const verses = versesSelected.join('\n');
      const versesIdList = selectedVersesId.sort();
      const versesNumList = versesIdList.join(',');
      const title = currentBook + ' ' + currentChapter + ' ' + versesNumList;
      const mark = { "header": title };
    
      if (bookMarks && bookMarks.some(bookMark => bookMark.header === mark.header)) {
        // Si el marcador ya existe, no hagas nada
        return;
      }
    
      try {
        setBookMarks(prevList => [...prevList, mark]);
        await AsyncStorage.setItem('BookMarks_verses', JSON.stringify([...bookMarks, mark]));
        console.log('Bookmark saved successfully');
      } catch (error) {
        console.error('Error saving bookmark:', error);
      };
      unselect();
    };

    return(
      <View style={shown==true?styles.containerShown:styles.containerHide}>
        <View style={styles.listItems}>
          <Pressable onPress={saveBookMark} style={({pressed}) => [pressed?styles.iconPressed:styles.nonPressed]}>
            <MaterialCommunityIcons style={styles.icons} name="bookmark-plus" size={24}/>
          </Pressable>
          <Pressable onPress={copyToClipboard} style={({pressed}) => [pressed?styles.iconPressed:styles.nonPressed]}>
            <Octicons style={styles.icons} name="copy" size={24} />
          </Pressable>
        </View>
      </View>

    )
  }

  export default FloatMenu;