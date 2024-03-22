import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({

    chaptersList:{
        display: "flex",
        flexDirection: "row",
        flexWrap:"wrap",
        padding: "5vw",
        justifyContent: "center", 
        alignItems: "center",
    },
    chapterItem:{
        justifyContent: "center",
        minWidth: "15vw",
        minHeight: "15vw",
        textAlign: "center",
    },
    
    chapterText:{
        textAlign: "center",
        color: COLORS.secondarylight,
        fontFamily:FONT.medium
    }

})

export default styles;

