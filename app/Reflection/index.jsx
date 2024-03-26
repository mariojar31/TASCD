
import React from 'react';
import {useEffect, useState, useLayoutEffect} from 'react';
import {COLORS, SIZES, FONT} from '../../constants/index.js'
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
    Dimensions,
    ScrollView
  } from "react-native";

  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { NavigationContainer } from '@react-navigation/native';

  import { Feather } from '@expo/vector-icons';
  import { Entypo } from '@expo/vector-icons';
  import { FontAwesome6 } from '@expo/vector-icons';

  import styles from "./style.js";
  import Card from "../../components/card/index.jsx";
  import { StatusBar } from "expo-status-bar";
  import { useNavigation, router, Link } from 'expo-router';
  import HeaderRightCustome from '../../components/HeaderRightCustome/index.jsx';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { getVerse, obtainDailyReflection, utilitySplit } from '../../api/index.js';
  import { Ionicons } from '@expo/vector-icons';
  import ReflectionQuiz from './ReflectionQuiz.jsx';
  import HomeScreen from '../index.jsx';
  

  const imgBackground = require("../../assets/background/bg.png");
  const time = new Date().getHours();
  const currentDate = new Date().toLocaleString('en-CO').slice(0,10);


  const Reflection = ({navigation})=>{

    const [isLoading, setIsLoading]=useState(true);
    const [currentVersion, setCurrentVersion] = useState(null);
    const [dailyWord, setDailyWord]=useState('');
    const [verseNum, setVerseNum]=useState(null);
    const [idDevotional, setIdDevotional]=useState(null);

    const GoBackButton = ()=>{
        const nav = useNavigation();
        return(
            <Pressable style={{padding:"5vw"}} onPress={()=>nav.push('Home')}>
                <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
            </Pressable>
            
        )
    }

    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTintColor: COLORS.primary,
          headerTitle: time<20?`Reflexión del día`:'Reflexión de la Noche',
          headerTitleStyle: { color: COLORS.primary },
          headerRight: () => <HeaderRightCustome menuDots={true} bookMarks={false} marks={false} isMarked={false} onPressMark={()=>null} />,
          headerTransparent: true,
          headerLeft: ()=> <GoBackButton/>,
        });
      }, [navigation]);

    useEffect(() => {
    const getParams = async () => {
      try {
        const currentVersion = await AsyncStorage.getItem('bibleVersion');
        if(currentVersion){
            setCurrentVersion(currentVersion);
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    getParams();
  }, []);

    useEffect(()=>{
        const obtainData = async()=>{
           try{ 
            const data = await obtainDailyReflection(currentDate,time<20?false:true);
            const item = data.resp.rows[0];
            const id = item.id;
            const [book,chapter,verse] = utilitySplit(item.quote);
            const reflection = item.reflection;
            const ref = item.quote;

            setIdDevotional(id);
            setVerseNum(verse[0]);
            saveParams(book,chapter);

            const verses_ = await AsyncStorage.getItem(`${currentVersion}_${book}_${chapter}_${verse}`);
            const verses=JSON.parse(verses_);

            if(verses){
                const Quote = `${book} ${chapter}: ${verse}`;
                setDailyWord({header:Quote,text:verses,reflection:reflection, ref:ref});
                setIsLoading(false);

            }else{
                const verses = await getVerse(currentVersion,book,chapter,verse);

                setDailyWord({header:verses.quote,text:verses.text,reflection:reflection, ref:ref});
                setIsLoading(false);
                saveVerses(book,chapter,verse,verses.text);
            }

            
            
            }catch(error){
                console.error(error);
            };
        
        }

        obtainData()
        
    },[currentVersion])

    
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
            await AsyncStorage.setItem(`${currentVersion}_${book}_${chapter}${verses_!==''?`_${verses_}`:verses_}`,JSON.stringify(data));
        }catch(error){
            console.error('Error saving verses: ',error);
        }
    };

    const openFullChapter = ()=>{
        router.push(`Bible/Chapters/Verses#${verseNum}`);
    }

    return(
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
                    <View style={{marginTop:"50px", marginBottom:"3vw"}}>
                        <View style={{ padding:"2vw", borderColor: COLORS.secondary, borderRadius:10, borderWidth:1}}>
                            <Text style={{textAlign:"center", fontFamily:FONT.bold, color:COLORS.secondarylight, fontWeight:"700", fontSize:SIZES.medium, textTransform:'capitalize'}}>
                                {dailyWord.header}
                            </Text>
                            <View style={{padding:"2vw"}}>
                                <Pressable onPress={openFullChapter}>
                                    <ScrollView style={{height:"20vh"}}>
                                        {isLoading?<Text style={{textAlign:"center", color:COLORS.secondarylight, fontFamily:FONT.bold, fontSize:SIZES.medium}}>{'\n\n\n'}Loading...</Text>:(dailyWord.text?
                                            dailyWord.text.map((verse, index)=>
                                            <Text key={index} style={{textAlign:"center", color:COLORS.secondarylight, fontFamily:FONT.bold, fontSize:SIZES.medium}}>
                                                {verse.verse}
                                            </Text>
                                            ):null)
                                        }
                                    </ScrollView>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                    <View style={styles.reflectionContainer}>
                        <ScrollView>
                            <Text style={styles.reflectionText}>
                                {dailyWord.reflection}
                            </Text>
                        </ScrollView>
                    </View>

                    <View style={styles.ButtonContainer}>
                            <Pressable onPress={()=>navigation.navigate('ReflectionTASCD',{id:idDevotional,ref:dailyWord.ref})} style={({pressed})=>[pressed?styles.btnPressed:styles.Button]}>
                                <Text  style={styles.Button}>
                                    Mi Reflexíon Personal
                                </Text>
                            </Pressable>
                    </View> 
                </View>
            </ImageBackground>
        </SafeAreaView>

        
    )
  }

  const Stack = createNativeStackNavigator();

  const MyStack = ()=>{
    return(
        <NavigationContainer independent="true">
            <Stack.Navigator initialRouteName='Reflection'>
                <Stack.Screen name='Reflection' component={Reflection} options={{title:'Reflection'}}/>
                <Stack.Screen name='ReflectionTASCD' component={ReflectionQuiz} options={{headerShown:false}}/>
                <Stack.Screen name='Home' component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
  }

  export default MyStack;