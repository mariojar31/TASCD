import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';

const TagsInput = ({handleAdd}) => {

  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState('');

  const handleTagsInputChange = (text) => {
    setTagsInput(text);
  };

  const handleAddTag = () => {
    if (tagsInput.trim() !== '') {
      setTags([...tags, tagsInput.trim()]);
      handleAdd(tagsInput.trim());
      setTagsInput('');
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        <TextInput
          style={styles.tagsInput}
          value={tagsInput}
          onChangeText={handleTagsInputChange}
          placeholder="Agregar Compromiso"
          onSubmitEditing={handleAddTag}
          blurOnSubmit={false}
        />
        <ScrollView  style={styles.tagsContainer}>
        {tags.map((tag, index) => (
            
                <TouchableOpacity key={index} onPress={() => handleRemoveTag(index)} style={styles.tag}>
                    <Text>{tag} <AntDesign name="closecircleo" size={12} color="black" /></Text>
                </TouchableOpacity>    
        ))}
        </ScrollView>

      </View>
    </View>
  );
};


export default TagsInput;