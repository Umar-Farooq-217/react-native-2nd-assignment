/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';

export default function Todos() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todos = await db.collection('firebasePracticeTodoApp').get();
    const todoResult = [];
    todos.forEach((todo) => {
      console.log('todo', todo.data());
      todoResult.push({
        id: todo.id,
        ...todo.data(),
});
    });
    console.log('todos',todos);
    setData(todoResult);
    } catch (error) {
      console.log('fetchTodos',error);
    }
  };





  return (
    <ScrollView>
      <Text style={style.list}>List of Students</Text>


      {
        data.map((todo)=>{
          return (
            <View key={todo.id} style={{backgroundColor:'blue'}}>
            <Text style={{
              backgroundColor:'red',
              fontWeight:'bold',
              margin:5,
              fontSize:20,
            }} 
            >Title : {todo.title}</Text>
            <Text 
            style={{
              backgroundColor:'green',
              fontWeight:'bold',
              margin:5,
              fontSize:20,
            }} 
            >Category : {todo.descriptoin}</Text>
                  </View>
          );
        })
      }
    </ScrollView>
  );
}

const style = StyleSheet.create({
  list: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
