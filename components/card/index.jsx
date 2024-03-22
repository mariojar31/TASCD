import React, { Children } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    SafeAreaView,
    Button,
    Pressable,
    Alert
  } from "react-native";
  import styles from "./styles.js";
  

  export default function Card({children, title, btnText="", btnStyle='default', btnFunction= ()=>console.log('Boton Presionado')}){
    return(
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                    {title}
                </Text>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                    {children}
                </Text>
                {btnStyle=='none' ? 
                <View></View> :(
                    <View style={styles.cardButtonContainer}>
                        <Pressable onPress={btnFunction} color="black" style={({pressed}) => [
                                pressed?styles.btnPressed:styles.btnCustom
                              ]}>
                            <Text style={styles.cardButton}>
                                {btnText}
                            </Text>
                        </Pressable>
                    </View>
                )}

            </View>

                
        </View>
    )
  }
