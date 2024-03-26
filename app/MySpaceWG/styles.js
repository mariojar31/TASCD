import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({

    container:{
        marginVertical:"2vw"    
    },

    List:{
        maxHeight: "50%", 
        height: "auto",
        minHeight:"10vw",
        marginHorizontal: "4vw",
        marginVertical: "2vw",
    },

    ModalContainer:{
        backgroundColor: COLORS.light,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        width:'100vw',
        height:'100vh'
    },
    ModalNavBar:{
        display:"flex", 
        flexDirection:"row",
        justifyContent:"space-between", 
        width:"100%", 
        padding:"2vw",
        alignItems:"center"
    },
    ModalHeaderTitle:{
        fontFamily:FONT.bold, 
        fontSize:SIZES.medium
    },
    ModalTitle:{
        margin:"2vw",
        textAlign:"center",
        fontFamily:FONT.bold, 
        fontSize:SIZES.medium, 
        fontWeight:"600",
        color:COLORS.secondarylight,
        borderBottomLeftRadius:"25px",
        borderBottomRightRadius:"25px",
        backgroundColor:COLORS.secondary,
        width:"80vw",
        padding:"5vw"
    },
    ModalQuoteContainer:{
        width:"80vw", 
        height:"25vh", 
        margin:"3vw",
        borderRadius:"25px",
        borderColor:COLORS.secondarylight,
        borderWidth:1,
        padding:"3vw"
    },
    ModalSectionH2:{
        textAlign:"center",
        fontFamily:FONT.bold,
        fontSize:SIZES.medium2,
        fontWeight:"600",
        color:COLORS.secondarylight,
        marginBottom:"3vw"
    },
    ModalSectionContainer:{
        padding:"3vw", 
        backgroundColor:COLORS.secondarytrans, 
        alignItems:"center",
        marginBottom:"4vw"
    },
    ModalSectionText:{ 
        textAlign:"justify", 
        fontFamily:FONT.medium2, 
        fontSize:SIZES.medium2, 
        color:COLORS.secondarylight, 
        width:"80%"
    },
    commitmentsText:{
        fontFamily:FONT.light, 
        fontSize: SIZES.medium,
        color: COLORS.secondarylight,

        }

    

})

export default styles;

