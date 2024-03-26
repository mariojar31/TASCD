import React from 'react';
import { View, useWindowDimensions, Text, Image, SafeAreaView, StatusBar, ScrollView, Pressable, Modal } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, FONT, SIZES } from '../../constants';
import { useNavigation } from 'expo-router';
import { useState, useEffect } from 'react';
import HeaderRightCustome from '../../components/HeaderRightCustome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { utilitySplit, getVerse } from '../../api';
import BookMarks from '../BookMarks';

const LazyPlaceHolder = ()=>{
    return(
        <View style={{height:"100%", justifyContent:"center", alignItems:"center", backgroundColor:COLORS.light}}>
            <Image source={require('../../assets/icon.png')} style={{width:"100px", height:"100px"}}/>
            <Text style={styles.ModalSectionH2}>
                Loading...
            </Text>
        </View>
    )
}

const saveVerses = async(version,book,chapter,verses_,data)=>{
    try{
        await AsyncStorage.setItem(`${version}_${book}_${chapter}${verses_!==''?`_${verses_}`:verses_}`,JSON.stringify(data));
    }catch(error){
        console.error('Error saving verses: ',error);
    }
};


   

const MyDevotionalsList = () => {
    const navigation = useNavigation();
    const [devotionalList, setDevotionalList]=useState([]);
    const [shownModal, setShownModal]=useState(false);
    const [devotionalData, setDevotionalData]=useState([]);
    const [quote, setQuote]=useState(null);
    const [textQuote, setTextQuote]=useState(null);
    const [currentVersion, setCurrentVersion]=useState(null);
    const [qtdD, setQtdD]=useState(null);
    const [commitments, setCommitments]= useState([]);
    const [date,setDate]=useState(null);
    

    useEffect(()=>{
        const getList = async()=>{
            const data = await AsyncStorage.getItem('storedTASCD');
            const currentV = await AsyncStorage.getItem('bibleVersion');

            if(data){
                const storedTASCD = JSON.parse(data);
                setDevotionalList(storedTASCD);
            } 
            if(currentV){
              setCurrentVersion(currentV);
            }
        };

        getList();

        const listener = navigation.addListener('focus', () => {
            getList();
        });

        return () => {
            listener();
        };

    },[navigation]);


      const fetchData = async(data)=>{

          try{
      
              const [book,chapter,verse]= utilitySplit(data.ref);
  
              const dataVerses = await AsyncStorage.getItem(`${currentVersion}_${book}_${chapter}_${verse}`);

              if(dataVerses){
                  if(dataVerses.length>1){
                    const  verses = JSON.parse(dataVerses).map(verse=>verse.verse);
                    setTextQuote(verses.join(' '));
                    setQuote(`${book} ${chapter}:${verse}`);
                  }else{
                    const verses = JSON.parse(dataVerses).verse;
                    setTextQuote(verses);
                    setQuote(`${book} ${chapter}:${verse}`);
                  }
                }else{
                  const data = await getVerse(currentVersion,book,chapter,verse);
                  const dataVerses=data.text;
                  const cita = data.quote;
                  if(dataVerses.length>1){
                    const verses = dataVerses.map(verse => verse.verse);
                    setTextQuote(verses.join(' '));
                    saveVerses(currentVersion,book,chapter,verse,dataVerses);
        
                  }else{
                    const verses = dataVerses.verse;
                    setTextQuote(verses);
                    saveVerses(currentVersion,book,chapter,verse,dataVerses);
                  }
                  setQuote(cita);
                      
                }

                setQtdD(data.answers[8]);
                setCommitments(data.commitments);
                setDate(data.date);

            
          }catch(error){

          }
      }
  

    const setDataTASCD=(data)=>{
      fetchData(data);
      setDevotionalData(data);
    }
    const handleTASCD = ()=>{
        setShownModal(!shownModal);
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light, marginTop: StatusBar.currentHeight || 0  }}>
        <View style={{margin:"3vw"}}>
            <ScrollView style={{width:"100%"}}>
                {devotionalList.length!==0? devotionalList.map((item,index)=><Pressable onPress={()=>{setDataTASCD(item); handleTASCD()}} key={index} style={({pressed})=>pressed?{borderColor:COLORS.secondary, borderWidth:"1px", borderRadius:"10px", padding:"3vw", margin:"1vw", backgroundColor:COLORS.secondarytrans}:{borderColor:COLORS.secondary, borderWidth:"1px", borderRadius:"10px", padding:"3vw", margin:"1vw"}}>
                    <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <Text style={{color:COLORS.secondarylight, fontFamily:FONT.bold, fontSize:SIZES.small}}>{item.ref}</Text>
                        <Text style={{fontFamily:FONT.light, fontWeight:"100",color:COLORS.secondary}}>{item.date}</Text>
                    </View>
                    </Pressable>):<Text>Sin devocionales guardados...</Text>}
            </ScrollView>
        </View>

        {/*MODAL*/}

        <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      }}>
          <Modal
            animationType="slide"
            transparent={true}

            visible={shownModal}
            >
            <View style={styles.ModalContainer}>
              <View style={{padding: "3vw", width:"100%"}} >
                <View style={styles.ModalNavBar}>
                    <Pressable onPress={()=> handleTASCD([])}>    
                        <Ionicons name="arrow-back" size={27} color="black" />
                    </Pressable>
                    <Text style={styles.ModalHeaderTitle}>Fecha: {date}</Text>
                    <Entypo name="dots-three-horizontal" size={27} color="black" />
                </View>
                
                <ScrollView style={{height:"85vh"}}>
                    <View style={{alignItems:"center"}}>
                        <Text style={styles.ModalTitle}>Mi Tiempo A Solas Con Dios</Text>
                        <View style={styles.ModalQuoteContainer}>
                          <Text style={{fontFamily:FONT.light, fontSize:SIZES.small, textAlign:"center", fontWeight:"600"}}>{quote}</Text>
                            <ScrollView style={{}}>
                                <Text style={{fontFamily:FONT.light, fontSize:SIZES.medium2, textAlign:"center"}}>
                                    {textQuote}
                                </Text>
                            </ScrollView>
                        </View>
                        <View style={{padding:"2vw"}}>
                            <Text style={styles.ModalSectionH2}>
                                ¿Que te dijo Dios?
                            </Text>
                            <View style={styles.ModalSectionContainer}>
                                <Text style={styles.ModalSectionText}>
                                    {qtdD}
                                </Text>
                            </View>
                            <Text style={styles.ModalSectionH2}>
                                ¿A que te comprometiste?
                            </Text>
                            <View style={styles.ModalSectionContainer}>
                              <View style={{}}>
                                {commitments?commitments.map((item, index)=>(
                                  <View key={index} style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    alignItems:"center"}}>
                                    <Octicons name="dot-fill" size={15} color={COLORS.secondarylight} style={{padding:"3vw"}} />
                                    <Text style={styles.commitmentsText}>{item}</Text>  
                                  </View> 
                                )):<Text style={styles.commitmentsText}>No hay compromisos...</Text>}
                                </View>

                              </View>
                           
                        </View>
                    </View>
                </ScrollView>

              </View>
            </View>
          </Modal>
        </View>  

        {/*MODAL*/}

    </SafeAreaView>
  );
};

const MyCommitments = () => {

  const navigation = useNavigation();
  const [commitments, setCommitments]=useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      const Commitments = await AsyncStorage.getItem('storedCommitments');
      console.log(Commitments);
      if(Commitments){
        const commitmentsList = JSON.parse(Commitments);
        setCommitments(commitmentsList);
      }
    };
    fetchData();
    const listener = navigation.addListener('focus', () => {
      getList();
  });

  return () => {
      listener();
  };
  },[navigation])
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>
          <View style={{margin:"3vw", paddingHorizontal:"2vw"}}>          
            
            {commitments?commitments.map((item, index)=>(
            <View key={index} style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center"}}>
              <Octicons name="dot-fill" size={15} color={COLORS.secondarylight} style={{padding:"3vw"}} />
              <Text style={[styles.commitmentsText,{fontSize:SIZES.medium}]}>{item}</Text>  
            </View> 
          )):<Text style={styles.commitmentsText}>No hay compromisos...</Text>}
          </View>
    </View>
  );
};

const MyStoredVerses = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>

    </View>
  );
};

const renderScene = SceneMap({
  first: MyDevotionalsList,
  second: MyCommitments,
  third: BookMarks
});

export default function MySpaceWithGod() {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Mis Devocionales' },
    { key: 'second', title: 'Mis Compromisos' },
    { key: 'third', title: 'Mis Versos Guardados' }
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: COLORS.secondarylight,
      headerTitle: `Mi Espacio con Dios`,
      headerTitleStyle: { color: COLORS.secondarylight },
      headerRight: () => <HeaderRightCustome menuDots={true} bookMarks={false} marks={false} isMarked={false} onPressMark={()=>null} />,
      headerStyle: { backgroundColor: COLORS.light }
    });
  }, [navigation]);


  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderLazyPlaceholder={LazyPlaceHolder}
      lazy
      renderTabBar={props => <TabBar {...props} style={{backgroundColor: COLORS.light}} indicatorStyle={{backgroundColor:COLORS.backgroundReflectionCardColor}} activeColor={COLORS.backgroundReflectionCardColor} labelStyle={{color:COLORS.secondarylight, fontWeight:"500", fontFamily:FONT.bold}}/>}

    />
  );
};