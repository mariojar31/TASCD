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
    }
})

export default styles;

