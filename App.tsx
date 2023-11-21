/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import TodoApp from './src/screens/todoApp/todoApp';
// import Todos from './src/screens/todos/todos';

const App = () => {
  return (
    <View>
      <TodoApp/>
      {/* <Todos /> */}
    </View>
  );
};

export default App;
