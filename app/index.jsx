
import React, { version } from 'react';
import {useEffect, useState, useLayoutEffect} from 'react';
import {COLORS, SIZES, FONT} from '../constants/index.js'
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
    Dimensions, Modal
  } from "react-native";

  import { Feather } from '@expo/vector-icons';
  import { Entypo } from '@expo/vector-icons';
  import { FontAwesome6 } from '@expo/vector-icons';

  import styles from "./styles.js";
  import Card from "../components/card/index.jsx";
  import { StatusBar } from "expo-status-bar";
  import { Stack } from 'expo-router';
  import { useNavigation, router } from 'expo-router';

  import { getVerse, obtainDailyReflection, utilitySplit } from '../api/index.js';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const imgBackground = require("../assets/background/bg.png");
  const time = new Date().getHours();
  const currentDate = new Date().toLocaleString('en-CO').slice(0,10);

const HomeScreen = () => {

    const navigation = useNavigation();
    const [quote, setQuote] = useState('');
    const [quoteText, setQuoteText] = useState('');
    const [shownModal, setShownModal]=useState(false);

    const [isLoading, setIsLoading] = useState(true);
    
    useLayoutEffect(()=>{
      navigation.setOptions({headerShown:false});
    },[navigation]);

    const viewReflection = ()=>{
      navigation.navigate('Reflection');
    };

    const saveVerses = async(version,book,chapter,verses_,data)=>{
      try{
          await AsyncStorage.setItem(`${version}_${book}_${chapter}${verses_!==''?`_${verses_}`:verses_}`,JSON.stringify(data));
      }catch(error){
          console.error('Error saving verses: ',error);
      }
  };

    useEffect(()=>{
      const fetchData = async()=>{
        try{
          const currentVersion = await AsyncStorage.getItem('bibleVersion');
          const dailyVerse = await obtainDailyReflection(currentDate,time<20?false:true);
          const item = dailyVerse.resp.rows[0];
          
          const [book,chapter,verse] = utilitySplit(item.quote);

          if(currentVersion){

            const storedVerse = await AsyncStorage.getItem(`${currentVersion}_${book}_${chapter}_${verse}`);

            if(storedVerse){
              if(storedVerse.length>1){
                const  verses = JSON.parse(storedVerse).map(verse=>verse.verse);
                setQuoteText(verses.join(' '));
                setQuote(`${book} ${chapter}:${verse}`);
              }else{
                const verses = JSON.parse(storedVerse).verse;
                setQuoteText(verses);
                setQuote(`${book} ${chapter}:${verse}`);
              }
            }else{
              const data = await getVerse(currentVersion,book,chapter,verse);
            
              const dataVerses=data.text;
              const cita = data.quote;
              if(dataVerses.length>1){
                const verses = dataVerses.map(verse => verse.verse);
                setQuoteText(verses.join(' '));
                saveVerses(currentVersion,book,chapter,verse,dataVerses);

              }else{
                const verses = dataVerses.verse;
                setQuoteText(verses);
                saveVerses(currentVersion,book,chapter,verse,dataVerses);
              }
              setQuote(cita);
              

            }
        
            setIsLoading(false);
          }

          
        }catch(error){
          console.error('Error: ', error);
          setIsLoading(false);
        }
      }

      fetchData();
    },[]);

    
    return (
      
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "beige",
          marginTop: StatusBar.currentHeight || 0,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width
        }}
      >
        <ImageBackground
          source={imgBackground}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "flex-start",
            zIndex: -2,
            position:"fixed",
            width:"100%"
          }}
        >
          <View style={{marginHorizontal:"7vw", marginVertical:"5vw"}}>
              <StatusBar style="auto" />
              <View style={{flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
                  <Image source={require("../assets/icon.png")} style={{width:60,height:60}}/>
                  <Text style={styles.topMenu}>TASCD</Text>
                  <View style={{flexDirection:"row"}}>
                      <Pressable onPress={() => setShownModal(true)}
                                  style={({pressed}) => [
                                      pressed?styles.btnPressed:styles.btnCustom
                                  ]}>
                          <Entypo name="help-with-circle" size={24} style={styles.topMenuIcons} />
                      </Pressable>
                      <Pressable onPress={() => console.log('Boton Ayuda presionado')}
                                  style={({pressed}) => [
                                      pressed?styles.btnPressed:styles.btnCustom
                                  ]}>
                          <Feather name="settings" size={24} style={styles.topMenuIcons} />
                      </Pressable>
                  </View>
              </View>
  
              <Card title={time<20?'Versículo del Día':'Versículo de la Noche'} btnText="Ver reflexión" btnFunction={viewReflection}>
                  <View style={{flex:1, justifyContent:"start"}}>
                    {isLoading ? 
                      (<Text>...Loading</Text>) :
                      (<Text style={{maxHeight:"80%", fontSize:SIZES.medium2, fontWeight:"500"}}> {quoteText.slice(0,100)+'[...]'} </Text>)}
                      <Text style={{textAlign:"right", fontFamily:FONT.bold, color:COLORS.primary, fontWeight:"700", fontSize:SIZES.medium2,textTransform:"capitalize"}}>{quote}</Text>
                  </View>          
              </Card>
  
              <View style={styles.buttonList}>
                  <Pressable onPress={()=>navigation.navigate('MySpaceWG/index')} style={({pressed})=>[pressed?styles.buttonPressed:styles.button]}>
                      <FontAwesome6 name="edit" size={50} color={COLORS.tertiary} style={{textAlign:"center"}} />
                      <Text style={{color:COLORS.tertiary, fontSize:SIZES.medSmall, maxWidth:75, textAlign: "center"}}>
                          Mi Espacio con Dios
                      </Text>
                  </Pressable>
                  <Pressable onPress={()=>router.push('/Bible')} style={({pressed})=>[pressed?styles.buttonPressed:styles.button]}>
                      <Entypo name="open-book" size={50} color={COLORS.tertiary} style={{textAlign:"center"}} />
                      <Text style={{color:COLORS.tertiary, fontSize:SIZES.medSmall, maxWidth:75, textAlign: "center"}}>
                          La Palabra
                      </Text>
                  </Pressable>
                  <Pressable onPress={()=>console.log("Btn 3")} style={({pressed})=>[pressed?styles.buttonPressed:styles.button]}>
                      <Entypo name="plus" size={50} color={COLORS.tertiary} style={{textAlign:"center"}} />
                      <Text style={{color:COLORS.tertiary, fontSize:SIZES.medSmall, maxWidth:75, textAlign: "center"}}>
                          Espacio Vacio
                      </Text>
                  </Pressable>
              </View>
          </View>
        </ImageBackground>
        <Modal 
        animationType="slide"
        transparent={true}
        visible={shownModal}>
          <Pressable onPress={()=>setShownModal(!shownModal)}>
          <View style={{height:"100vh", width:"100vw", backgroundColor:"rgba(0,0,0,0.5)", alignItems:"center", justifyContent:"center" }}>
            <View style={{       
              backgroundColor: COLORS.secondary,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent:"center",
              shadowColor: '#000',
              width:'80vw',
              height:'60vh', 
              padding:"5vw"}}>
                <View style={{width:"100%", height:"100%", justifyContent:"center",alignItems:"center"}}>
                  <Text style={{textAlign:"center", height:"100%", fontFamily:FONT.bold, fontSize:SIZES.medium, color:COLORS.secondarylight}}>
                    {`Designed & Developed By: \nMario Acendra\n\nDevocional: \nBlog Devocional Centro Biblico Internacional.\n(https://www.cbint.org/devocional)\n\nImagen Background: FreePic (http://www.freepic.com/)\n\nTextos Biblicos: Reina Verela Revisada 1960 - Biblia Versión Interdenominacional
                    `}
                  </Text>
                  <Pressable onPress={()=>setShownModal(!shownModal)}>
                    <Text style={{padding:"2vw", borderRadius:"10px", backgroundColor:COLORS.primarytrans}}>Close</Text>
                  </Pressable>
                </View>

            </View>
          </View>
          </Pressable>

        </Modal>
      </SafeAreaView>
      
    );
  };

  export default HomeScreen;