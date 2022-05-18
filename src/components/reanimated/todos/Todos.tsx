import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Todo} from './Todo';

type TasksType = {
  id: number;
  title: string;
};

const TITLES = ['React', 'ReactNative', 'JavaScript', 'TypeScript', 'Vue'];
const TASKS = TITLES.map((title, index) => ({id: index, title}));

export const Todos = () => {
  const refScrollView = useRef(null);

  const [tasks, setTasks] = useState<TasksType[]>(TASKS);

  const handleRemoveTask = useCallback((taskId: TasksType['id']) => {
    setTasks(prevState => prevState.filter(({id}) => taskId !== id));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TASKS</Text>

      <View style={styles.scrollContainer}>
        <ScrollView ref={refScrollView}>
          {tasks.map(({id, title}) => (
            <Todo
              key={id}
              id={id}
              title={title}
              onRemoveTask={handleRemoveTask}
              simultaneousHandlers={refScrollView}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '600',
    marginLeft: 30,
    marginBottom: 30,
  },
});
