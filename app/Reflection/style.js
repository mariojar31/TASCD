import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
   
    button:{
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        color: COLORS.primary,
        fontFamily: FONT.bold,
        textAlign: "center",
        padding: "2vw", paddingHorizontal: "3vw",
        margin: 5,
        borderRadius: "6px"        
    },

    btnPressed:{
        backgroundColor: COLORS.tertiary,
        borderRadius: 6
    },

    btnCustom:{

    },

    bookList:{
        height: "100%", 
        marginHorizontal: "4vw"
    },

    bookPressable:{
        paddingHorizontal:"1vw", 
        paddingVertical: "2vw", 
        color:COLORS.secondarylight, 
        borderBottomColor: COLORS.secondary, 
        borderBottomWidth: 1,
        fontFamily: FONT.regular
    },
    ButtonContainer:{
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        margin:"3vw",
    },
    Button:{
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        color: COLORS.secondarylight,
        fontWeight:"700",
        fontFamily: FONT.bold,
        fontSize:SIZES.medium,
        textAlign: "center",
        padding: "2vw", paddingHorizontal: "5vw",
        borderRadius: "6px",        
    },

    btnPressed:{
        backgroundColor: COLORS.secondarytrans,
        borderRadius: 6,
        padding: "2vw", paddingHorizontal: "5vw",
    },

    btnCustom:{

    },
    topMenuIcon:{
        color:COLORS.secondarylight
    },

    reflectionContainer:{
        height:"80vw", 
        backgroundColor:COLORS.backgroundReflectionCardColor, 
        borderRadius:"15px",
        padding:"2vw"

    },

    reflectionText:{
        fontFamily:FONT.regular,
        fontSize:SIZES.medium,
        color:COLORS.secondarylight,
        padding: "1vw",
        margin: "4vw"
    },



})

export default styles;

