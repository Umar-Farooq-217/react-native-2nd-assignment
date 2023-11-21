/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../../config/firebase';

export default function TodoApp() {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [data, setData] = useState([]);
  const [todoCount, setTodoCount] = useState(0);





  const addTodoHandler = async () => {
    if (!title || !description || !id || !date) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000); // Hide notification after 2 seconds
      return;
    }

    try {
      const result = await db.collection('todoApp').add({
        title,
        description,
        id,
        date,
      });
      console.log('result', result);
      
    } catch (error) {
      console.log('error', error);
    }
    
  };


  const fetchTodos = async () => {
    try {
      const todos = await db.collection('todoApp').get();
      const todoResult = [];
      todos.forEach((todo) => {
        console.log('todo', todo.data());
        todoResult.push({
          id: todo.id,
          ...todo.data(),
        });
      });
      console.log('todos', todos);
      setData(todoResult);
      setTodoCount(todoResult.length);



    } catch (error) {
      console.log('fetchTodos', error);
    }
  };
  const deleteTodo = async (idToDelete) => {
    try {
      await db.collection('todoApp').doc(idToDelete).delete();
      setData((prevData) => prevData.filter((todo) => todo.id !== idToDelete));
    } catch (error) {
      console.log('deleteTodo', error);
    }
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Text style={{ backgroundColor: 'white', color: 'red', fontSize: 20, fontWeight: 'bold' }}>Total Todos: {todoCount}</Text>

        </View>

        <View>



        </View>

      </View>
      <Text style={{ fontSize: 25, textAlign: 'center', color: 'red', fontWeight: 'bold', margin: 20 }}>TodoApp</Text>

      <Modal
        visible={showNotification}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotification(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: 20, borderRadius: 10 }}>
            <Text style={{ color: 'white' }}>Please fill in all fields!</Text>
          </View>
        </View>
      </Modal>
      <TextInput style={{ backgroundColor: 'gray', margin: 3, fontWeight: 'bold' }}
        placeholder="Enter title"
        onChangeText={text => setTitle(text)}
      />
      <TextInput style={{ backgroundColor: 'skyblue', margin: 3, fontWeight: 'bold' }}
        placeholder="Enter Category"
        onChangeText={text => setDescription(text)}
      />
      <TextInput style={{ backgroundColor: 'orange', margin: 3, fontWeight: 'bold' }} placeholder="Enter id"
        onChangeText={text => setId(text)}
      />
      <TextInput style={{ backgroundColor: 'yellow', margin: 3, marginBottom: 6, fontWeight: 'bold' }}
        placeholder="Enter Date"
        onChangeText={text => setDate(text)}
      />
      <Button title="Create New Todo" onPress={addTodoHandler} />

      <ScrollView style={{ backgroundColor: 'black', marginTop: 30 }}>
        <Button title="Show Todo" onPress={fetchTodos} />


        {
          data.map((todo, id) => {
            return (

              <View key={id} style={{ backgroundColor: 'blue' }}>
                <Text style={{
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  margin: 5,
                  fontSize: 20,
                }}
                >Title : {todo.title}</Text>
                <Text
                  style={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    margin: 5,
                    fontSize: 20,
                  }}
                >Category : {todo.description}</Text>
                <Text
                  style={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    margin: 5,
                    fontSize: 20,
                  }}
                >Id : {todo.id}</Text>
                <Text
                  style={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    margin: 5,
                    fontSize: 20,
                  }}
                >Date : {todo.date}</Text>
                <TouchableOpacity
                style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 5 }}
                onPress={() => deleteTodo(todo.id)}
                >
                <Text style={{ color: 'white' }}>Delete</Text>
                </TouchableOpacity>
                <Text style={{ backgroundColor: 'black', height: 5,marginTop:5 }}></Text>
              </View>
            );
          })
        }


      </ScrollView>





    </ScrollView>
  );
}
