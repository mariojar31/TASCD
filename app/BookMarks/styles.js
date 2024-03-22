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

    h1:{
        color: COLORS.secondarylight,
        fontFamily: FONT.bold,
        fontSize:SIZES.medium,
        marginHorizontal:"4vw",
        marginVertical:"2vw",
    },

    Pressable:{
        paddingHorizontal:"1vw", 
        paddingVertical: "2vw", 
        color:COLORS.secondarylight, 
        borderBottomColor: COLORS.secondary, 
        borderBottomWidth: 1,
        fontFamily: FONT.regular
    },

    textItem:{
        textAlign: "left",
        fontSize: SIZES.small,
        color: COLORS.secondarylight       

    },

    verseItemSelected:{
        textAlign: "left",
        padding: "1vw",
        fontSize: SIZES.medium,
        color: COLORS.secondarylight,
        textDecorationLine: "underline"
    },

    VersesList:{
        display: "flex",
        flexDirection: "column",
        flexWrap:"nowrap",
        padding: "2vw",
        marginHorizontal: "5vw",
        marginVertical:"2vw",
        alignItems: "start",
        alignItems: "center"
    },
    VersesItem:{
        textAlign: "left",
        padding: "1vw",
        fontSize: SIZES.medium,
        color: COLORS.secondarylight       

    },
    
    ButtonContainer:{
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        margin:"3vw"
    },
    Button:{
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: COLORS.secondarylight,
        color: COLORS.primary,
        fontFamily: FONT.bold,
        fontSize:SIZES.medium,
        textAlign: "center",
        padding: "2vw", paddingHorizontal: "3vw",
        margin: 5,
        borderRadius: "6px",        
    },

    btnPressed:{
        backgroundColor: COLORS.tertiary,
        borderRadius: 6
    },

    btnCustom:{

    }

})

export default styles;

