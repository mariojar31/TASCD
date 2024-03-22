import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants/index.js";

const styles = StyleSheet.create({

    background:{
        backgroundColor: COLORS.tertiary
    },

    topMenu:{
        color:COLORS.primary,
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge
    },

    topMenuIcons:{
        color:COLORS.primary,
        margin: 5

    },

    card:{
        marginVertical:"5vw",
        borderStyle:"solid", 
        borderRadius: 10, 
        borderWidth:1, 
        borderColor: COLORS.secondary, 
        backgroundColor:COLORS.secondarytrans,
        width:"100%", height:200,
    },

    cardTitle:{
        fontSize: SIZES.large,
        color: COLORS.tertiary,
        paddingLeft: "3vw",
        paddingTop: "1vw",
        fontFamily: FONT.bold,
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
        textAlign:"center"
    },
    cardButton:{
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
    ,
    container: {
        width: "100%",
    },
    searchTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
    },
    noOfSearchedJobs: {
        marginTop: 2,
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },
    loaderContainer: {
        marginTop: SIZES.medium
    },
    footerContainer: {
        marginTop: SIZES.small,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    paginationButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tertiary
    },
    paginationImage: {
        width: '60%',
        height: '60%',
        tintColor: COLORS.white
    },
    paginationTextBox: {
        width: 30,
        height: 30,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    paginationText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.primary
    },

    btnPressed:{
        backgroundColor: COLORS.secondarytrans,
        borderRadius: 6
    },

    btnCustom:{

    },

    buttonList:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"center",
        flexWrap: "wrap"
    },

    button:{
        backgroundColor:COLORS.secondary,
        padding: "2vw",
        paddingHorizontal: "4vw",
        borderRadius: 6,
        margin: "2vw",
        minHeight: "107px",
        minWidth: "109px"
    },
    buttonPressed:{
        backgroundColor: COLORS.secondarytrans,
        padding: "2vw",
        paddingHorizontal: "4vw",
        borderRadius: 6,
        margin: "2vw",
        minHeight: "107px",
        minWidth: "109px"
    }


});

export default styles;
