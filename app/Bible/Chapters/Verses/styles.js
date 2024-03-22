import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../../constants";

const styles = StyleSheet.create({

    VersesList:{
        display: "flex",
        flexDirection: "column",
        flexWrap:"nowrap",
        padding: "2vw",
        marginHorizontal: "5vw",
        marginVertical:"2vw",
        alignItems: "start",
    },
    VersesItem:{
        textAlign: "left",
        padding: "1vw",
        fontSize: SIZES.medium,
        color: COLORS.secondarylight       

    },

    verseItemSelected:{
        textAlign: "left",
        padding: "1vw",
        fontSize: SIZES.medium,
        color: COLORS.secondarylight,
        textDecorationLine: "underline"
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

    },
    highlightedVers:{
        textAlign: "left",
        padding: "1vw",
        fontSize: SIZES.medium,
        color: COLORS.secondarylight, 
        backgroundColor: COLORS.secondarytrans
    }

})

export default styles;

