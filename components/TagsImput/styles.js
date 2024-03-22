import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 20,
    },
    tagContainer: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height:"40vh"
      
    },
    tag: {
      backgroundColor: '#e0e0e0',
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
      margin: 5,
      alignItems:"center"
    },
    tagsInput: {
      flex: 1,
      fontSize: 16,
      maxHeight: 35,
      borderRadius: 10,
      padding:5,
      textAlign: "center",
      margin: "2vw"
    },
    tagsContainer:{
        height:"20vw",
        display: 'flex'
    }
  });

  export default styles;