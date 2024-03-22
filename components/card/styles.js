import { StyleSheet } from "react-native";

const COLORS = {
    primary: "#F7DDB5",
    primarytrans: "#F7DDB56B",
    secondary: "#D8C0B5",
    secondarytrans: "#D8C0B56B",
    tertiary: "#647484",
    secondarylight: "#4b3b34",
  
  
    color4: "#E69518",
    color5: "#774D0C",
  
    light: "beige",
    white: "#F3F4F8",
    lightWhite: "#FAFAFC",
  };
  
  const FONT = {
    regular: "JosefineSans-Regular",
    medium: "JosefineSans-Medium",
    bold: "JosefineSans-Bold",
    semibold: "JosefineSans-SemiBold",
    light: "JosefineSans-Light",
  };
  
  const SIZES = {
    xSmall: 10,
    small: 15,
    medium2:17,
    medium: 19,
    large: 23,
    xLarge: 26,
    xxLarge: 32,
  };
  
  const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };  

const styles = StyleSheet.create({
    card:{
        marginVertical:"5vw",
        borderStyle:"solid", 
        borderRadius: 10, 
        borderWidth:1, 
        borderColor: COLORS.secondary, 
        backgroundColor:COLORS.secondarytrans,
        width:"100%", height:"200px", maxHeight: 200
    },
    
    cardTitle:{
        fontSize: SIZES.large,
        color: COLORS.tertiary,
        paddingLeft: "3vw",
        paddingTop: "1vw",
        fontFamily: FONT.bold,
        textAlign: "center"
    },
    
    cardHeader:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10, 
        borderWidth:0, 
        backgroundColor: COLORS.secondary, 
        width:"100%", height:"20%"
    },
    
    cardBody:{
        backgroundColor:"transparent",
        width:"100%",
        height: "80%",
        justifyContent: "space-around"
    
    },
    cardText:{
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS.primary,
        padding: "3vw",
        maxHeight: "85px",
        textAlign:"center",
        flexDirection: "column"
    },
    cardButtonContainer:{
        justifyContent: "center",
        alignItems: "center"
    },
    cardButton:{
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        color: COLORS.tertiary,
        fontFamily: FONT.bold,
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

