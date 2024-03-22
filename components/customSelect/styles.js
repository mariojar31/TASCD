import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({

    button:{
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: COLORS.light,
        borderWidth: 1,
        borderColor:COLORS.secondarylight,
        color: COLORS.primary,
        fontFamily: FONT.bold,
        textAlign: "center",
        padding: "2vw", paddingHorizontal: "3vw",
        margin: 5,
        borderRadius: "6px",
        width: "80%",
        height: "auto"        
    },

    btnPressed:{
        backgroundColor: COLORS.tertiary,
        borderRadius: 6
    },

    btnCustom:{

    },

    dropdown:{
        position: "relative",
        display: "inline-block"
    },
    dropdownContent:{
        display: "none",
        position:"absolute",
        backgroundColor: COLORS.secondary,
        zIndex: 1,
    },
    dropdownContentShown:{
        display: "block",
        position:"absolute",
        backgroundColor: COLORS.secondary,
        zIndex: 1,
    },

    dropdownBtnText:{
        color: COLORS.secondarylight,
        fontFamily: FONT.bold,
        textAlign: "center",
        fontSize: SIZES.medium,
    },

    dropdownDropdownStyle: {backgroundColor: COLORS.light},
    dropdownRowStyle: {
      backgroundColor: COLORS.light,
      borderBottomColor: '#444',
      height: 50,
    },
    dropdownRowChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 18,
    },

    
})

export default styles;

