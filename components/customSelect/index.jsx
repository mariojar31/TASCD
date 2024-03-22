import React, { Children } from "react";
import { useEffect, useState } from "react"
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

import { COLORS, SIZES, FONT } from "../../constants/index.js";
import styles from './styles.js';
import { AntDesign } from '@expo/vector-icons';

import SelectDropdown from "react-native-select-dropdown";
 

const CustomSelect = ({optionList, defaultValue, onSelectChange})=>{

  const options = optionList;
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const handleSelectChange = (selectedItem, index)=>{
    setCurrentValue([index, selectedItem]);
    onSelectChange(selectedItem, index)
  }

    
    return(
        <View style={{alignItems: "center"}}>
            <SelectDropdown
            data={options}
            // defaultValueByIndex={defaultValue}
            defaultValue={defaultValue}
            onSelect={handleSelectChange}
            defaultButtonText={'Select country'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.button}
            buttonTextStyle={styles.dropdownBtnText}
            renderDropdownIcon={isOpened => {
              return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} color={COLORS.tertiary} size={12} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownBtnText}
          />
        </View>
        
    )
}

export default CustomSelect;