import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, Dimensions, Pressable, Image, ScrollView } from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import {Tooltip} from '@rneui/themed';
import { Entypo } from '@expo/vector-icons';
import {COLORS, SIZES, FONT} from '../../constants/index.js'
import { StatusBar } from "expo-status-bar";
import TagsInput from '../../components/TagsImput/index.jsx';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { utilitySplit, getVerse } from '../../api/index.js';



const ReflectionQuiz = ({navigation}) => {
  
  const {id,ref} = useLocalSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [quoteIsOpen, setQuoteIsOpen]=useState(false);
  const [currentVersion, setCurrentVersion] = useState(null);

  const [commitments, setCommitments] = useState('');
  const [quote, setQuote]=useState(null);
  const [storedTASCDList, setStoredTASCDList] = useState([]);
  const time = new Date();
  

  const Questions = [    
    {q:'¿De que trató el pasaje?',e:'Ten en cuenta escenario, personajes y acciones que estos realizan o presencian.'},
    {q:'¿Que te dice este pasaje a cerca de Dios?',e:'¿Quien es Dios? ¿Que características de Dios identificas en el pasaje?'},
    {q:'¿Que te dice a cerca del hombre?',e:'¿Como se muestra al hombre en el texto? ¿Que características se le da?'},
    {q:'¿Te ha hablado de algún Pecado?',e:'¿He sido confrontado por algún pecado que he cometido o estoy cometiendo?¿Me habla de algúna acción que no agrade a Dios?'},
    {q:'¿Alguna actitud a seguir que te haya revelado la palabra?',e:'Aquellas actitudes reveladas en el pasaje que podemos aplicar en nuestra vida.'},
    {q:'¿Te habló de algún mandamiento?',e:'¿Que me demanda a hacer la palabra?'},
    {q:'¿Has identificado alguna promesa del Señor?',e:'¿Que te dice Dios que hará por tí o para tí? Son aquellos mensajes en los que el Señor se compromete a conferir algo bueno, promesa de la cual tenemos la garantía divina que se cumplirá.'},
    {q:'¿Qué ejemplo a seguir o a evitar encuentras en el pasaje?',e:''},
    {q:'¿Qué te ha dicho?',e:'Escribe en este espacio aquello que Dios te habló particularmente a tí en este pasaje y en la reflexión que acabamos de hacer.'},
    {q:'¿Como esto cambia tu percepción?',e:'La palabra del Señor muchas veces nos confronta y cambia nuestras perspectivas de las cosas mediante las revelaciones que el Espiritu Santo nos confiere. '},
    {q:'¿Cómo puedes aplicarlo en tu vida?',e:'"Mas sed hacedores de la palabra, y no tan solamente oidores, engañándoos á vosotros mismos." El Señor en Santiago 1 nos exhorta a aplicar la palabra en nuestras vidas y no solo ser oidores de ella. ¿De que maneras puedes aplicar en tu vida lo revelado por el Señor en este pasaje?'},
    {q:'¿A que te comprometes?',e:'Después de haber leido y reflexionado con la palabra de hoy, ¿Qué compromiso te haces con el Señor?'}
        // Agrega más preguntas según sea necesario
    ];

    const [currentAnswer, setCurrentAnswer] = useState('');

    const saveDevotional = async () => {
      const newItem = { name: `${time.getTime()}-${id}`, date: time.toISOString().slice(0, 10), ref:ref, answers: answers, commitments: commitments };
      try {
        // Obtén la lista actual de devocionales del almacenamiento local
        const storedTASCDString = await AsyncStorage.getItem('storedTASCD');
        let storedTASCDList = JSON.parse(storedTASCDString) || []; // Si no hay nada en el almacenamiento, usa un array vacío
        const commitmentsList = await AsyncStorage.getItem('storedCommitments');
        let storedCommitments = JSON.parse(commitmentsList) || [];
        

        // Agrega el nuevo devocional a la lista
        storedTASCDList.push(newItem);
        storedCommitments.push(commitments);
    
        // Guarda la lista actualizada en el almacenamiento local
        await AsyncStorage.setItem('storedTASCD', JSON.stringify(storedTASCDList));
        await AsyncStorage.setItem('storedCommitments', JSON.stringify(storedCommitments));
    
        // Actualiza el estado con la lista actualizada
        setStoredTASCDList(storedTASCDList);
      } catch (error) {
        console.error('No se pudo guardar tu devocional. Error: ', error);
      }
    };

    useEffect(() => {
      const getParams = async () => {
        try {
          const currentVersion = await AsyncStorage.getItem('bibleVersion');
          const storedTASCD = await AsyncStorage.getItem('storedTASCD');
          if(currentVersion){
              setCurrentVersion(currentVersion);
          }
          if(storedTASCD){
            setStoredTASCDList(storedTASCD);
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

          const [book,chapter,verse]= utilitySplit(ref);
          

          const verses = await getVerse(currentVersion,book,chapter,verse);

          setQuote({header:verses.quote,text:verses.text});
          
          }catch(error){
              console.error(error);
          };
      
      }

      obtainData()
      
  },[currentVersion]);

    // Manejar el cambio de pregunta
  const handleNextQuestion = () => {
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
    } else if (currentQuestionIndex === Questions.length - 1) {
      // console.log(answers, commitments);
      saveDevotional();
      // setAnswers(new Array(Questions.length).fill(''));
      setCurrentQuestionIndex(Questions.length+1);
    }else if(currentQuestionIndex === Questions.length+1){
      setCurrentQuestionIndex(Questions.length);
    }
  };

  // Manejar el cambio en la respuesta actual
  const handleAnswerChange = (text) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);
  };

  // Manejar cambios en el texto de la respuesta actual
  const handleChangeText = (text) => {
    setCurrentAnswer(text);
    handleAnswerChange(text);
  };

  const handleAddCommitment = (tagsInput)=>{
    setCommitments([...commitments, tagsInput.trim()]);
  };

  const handleOpenQuote = ()=>{
    setQuoteIsOpen(!quoteIsOpen);
  }

  return (
    <SafeAreaView         style={{
      flex: 1,
      backgroundColor: "beige",
      marginTop: StatusBar.currentHeight || 0,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }}>
      {currentQuestionIndex!==-1 && currentQuestionIndex!==Questions.length?
      (<View style={{height:"10vh", padding:"5vw", marginTop:"5vw"}}>
              {(currentQuestionIndex>=0&&currentQuestionIndex<=2)?(<Text style={styles.HeaderSection}>Analicemos el Pasaje</Text>):((currentQuestionIndex>2&&currentQuestionIndex<=7)?(<Text style={styles.HeaderSection}>Reflexionemos</Text>):((currentQuestionIndex>7&&currentQuestionIndex<=10)?(<Text style={styles.HeaderSection}>Dios te ha hablado...</Text>):(currentQuestionIndex===Questions.length+1)?(<Text style={styles.HeaderSection}>Respondele a Dios</Text>):(<Text style={styles.HeaderSection}>Es momento de hacer compromisos con Dios...</Text>)))}
      </View>):null}
      {currentQuestionIndex!==-1 && currentQuestionIndex<Questions.length-1 ? <View style={{padding:"3vw", marginHorizontal:"5vw"}}>
        <Pressable onPress={handleOpenQuote}>
          <View style={{justifyContent:"center", alignItems:"center", margin:"2vw", backgroundColor:COLORS.secondarytrans, borderRadius:10}}>
            <ScrollView contentContainerStyle={{maxHeight:"65vw"}}>
              {quoteIsOpen?quote.text.map((verse,index)=><Text key={index} style={{textAlign:"center", fontFamily:FONT.medium, color:COLORS.secondarylight, fontSize:SIZES.medium, padding:"2vw  "}}>
                {verse.verse}
              </Text>):null}
            </ScrollView>  
            <Pressable onPress={handleOpenQuote}>
              <Text style={{textTransform:"capitalize" ,padding:"2vw", color:COLORS.secondarylight,fontFamily:FONT.regular, fontSize:SIZES.small, fontWeight:"600"}}>{quote.header}<AntDesign name={quoteIsOpen?"caretup":"caretdown"} size={12} color={COLORS.secondarylight} /></Text>
            </Pressable>
          </View>
        </Pressable>
      </View> : null}
      <View style={styles.container}>
      {currentQuestionIndex === -1 ? (
        <View style={styles.introContainer}>
          <Text style={styles.introTextHeader}>¡Bienvenido a tu espacio a solas con Dios!</Text>
          <Text style={styles.introText}>En este espacio encontrarás una serie de preguntas que te ayudarán a reflexionar a cerca del texto que acabas de leer. </Text>
          <Text style={styles.introText}>Es importante que hagas una reflexión personal a cerca de lo que te dice Dios a ti particularmente. </Text>
          <Pressable style={({pressed})=>pressed?styles.btnPressed:styles.Button} onPress={() => setCurrentQuestionIndex(0)}><Text style={styles.btnText}>Comenzar</Text></Pressable>
        </View>
      ) : currentQuestionIndex === Questions.length+1 ? (
        <View style={{ alignItems: "center",
        justifyContent: "center",
        height: "80vh"}}>
          <Image source={'../../assets/pray.png'} style={{width:"30vw",height:"30vw", zIndex:99}}/>
          <Text style={styles.thankYouText}>Ahora que has permitido que Dios te hablara, es momento de hablarle a Él en oración.</Text>
          <Text style={styles.thankYouText}>Tomate tu tiempo para hacerlo y hazlo de corazón.</Text>
          <Text style={styles.thankYouText}>Puedes pedirle <b>PERDÓN</b> por los pecados cometidos, mostrarle verdadero arrepentimiento y recibir su perdón. <b>AGRADECER</b> por las bendiciones y promesas recibidas. <b>PEDIR</b> por tus necesidades personales y las de otros y no te olvides de <b>ADORARLE</b>, puedes finalizar tu oración en alabanza y adoración.</Text>
          <Pressable style={({pressed})=>pressed?styles.btnPressed:styles.Button} onPress={() => setCurrentQuestionIndex(Questions.length)}><Text style={styles.btnText}>Finalizar</Text></Pressable>
        </View>
        
      ) :currentQuestionIndex === Questions.length ? (
        <View style={styles.introContainer}>
          <Text style={styles.thankYouTextHeader}>Has finalizado tu tiempo a solas con Dios.</Text>
          <Text style={styles.thankYouText}>El Señor reafirme en tu vida las palabras que te ha hablado en este tiempo a solas con Él y sean motor de cambio y entrega total a Él y a su perfecta Voluntad. {"\n\n"}<strong>¡Dios te Bendiga!</strong>{"\n "}</Text>
          <Pressable style={({pressed})=>pressed?styles.btnPressed:styles.Button} onPress={() => navigation.push('Home')}><Text style={styles.btnText}>Amén</Text></Pressable>
        </View>
        
      ) : (
        <View style={styles.questionContainer}>
          <View style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <Text style={styles.question}>{Questions[currentQuestionIndex].q}</Text>
            <Tooltip
                visible={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                containerStyle={{height:"auto"}}
                popover={<Text style={{ color: "#fff" }}>{Questions[currentQuestionIndex].e}</Text>}
                >
                <Entypo name="help-with-circle" size={20} style={styles.topMenuIcon} />
            </Tooltip>
          </View>
          { currentQuestionIndex!==11 ?
          <TextInput
            style={styles.answerInput}
            onChangeText={handleChangeText}
            value={answers[currentQuestionIndex] || ''}
            multiline="true"
            numberOfLines={5}
            placeholder="Escribe tu respuesta"
          />:
          <Text>
            <TagsInput handleAdd={handleAddCommitment}></TagsInput>
          </Text>
          }
          <Pressable
            style={({pressed})=>pressed?styles.btnPressed:styles.Button}
            onPress={handleNextQuestion}
          ><Text style={styles.btnText}>{currentQuestionIndex === Questions.length - 1 ? 'Enviar' : 'Siguiente'}</Text></Pressable>
        </View>
      )}
    </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    paddingHorizontal: 20,
    height:"50vh"
  },
  introContainer: {
    alignItems: 'center',
    justifyContent:'center',
    height:"100vh"
  },
  introText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color:COLORS.secondarylight,
    fontSize:SIZES.medium,
    fontFamily:FONT.medium,
    margin:"2vw"
  },
  introTextHeader:{
    fontSize:SIZES.large,
    fontFamily:FONT.bold,
    textAlign:"center",
    margin:"2vw"
  },

  thankYouContainer: {
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 20,
    textAlign: 'center',
    margin:"3vw",
    fontSize:SIZES.medium,
    fontFamily:FONT.medium,
  },
  thankYouTextHeader:{
    fontSize:SIZES.large,
    fontFamily:FONT.bold,
    textAlign:"center",
    margin:"2vw",
    fontWeight:"600"
  },
  questionContainer: {
    marginTop: '10vw',
    height: 'auto',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    fontSize:SIZES.large,
    fontFamily:FONT.medium,
    color:COLORS.secondarylight
  },
  answerInput: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  answerInput2: {
    width: '100%',
    
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  HeaderSection:{
    fontFamily:FONT.bold,
    fontSize:SIZES.large,
    color:COLORS.secondarylight,
    textAlign: "center",
    fontWeight:"600"
},
topMenuIcon:{
  color:COLORS.secondarylight
},
Button:{
  justifyContent:"center",
  alignItems: "center",
  borderColor:COLORS.secondary,
  fontFamily: FONT.bold,
  fontSize:SIZES.medium,
  textAlign: "center",
  padding: "2vw", paddingHorizontal: "5vw",
  margin: 5,
  backgroundColor: COLORS.secondary,
  borderRadius: "6px",        
},

btnText:{
  color: COLORS.secondarylight,
  fontWeight:"700",

},

btnPressed:{
  backgroundColor: COLORS.secondarytrans,
  justifyContent:"center",
  alignItems: "center",
  borderColor:COLORS.secondary,
  color: COLORS.secondarylight,
  fontFamily: FONT.bold,
  fontSize:SIZES.medium,
  fontWeight:"800",
  textAlign: "center",
  padding: "2vw", paddingHorizontal: "5vw",
  margin: 5,
  borderRadius: "6px",      
  
},

btnCustom:{

}
});

export default ReflectionQuiz;
