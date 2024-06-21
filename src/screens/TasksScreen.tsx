import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from '../store/tasks/tasksSlice';
import {RootState} from '../store';

const windowWidth = Dimensions.get('window').width;

const TasksScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (description) {
      dispatch(addTask({id: Date.now().toString(), description}));
      setDescription('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerButton}>
        <Pressable style={styles.button} testID="New-Task" onPress={() => setModalVisible(true)}>
          <Text style={styles.text}>New Task</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text style={styles.itemText}>{item.description}</Text>}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalBackground}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="New Task Name"
              value={description}
              onChangeText={setDescription}
              testID="New-Task-Input" 
            />
            <Pressable style={styles.button} onPress={handleAddTask} testID="Add">
              <Text style={styles.text}>Add</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  itemText: {
    color: 'black',
    paddingLeft: 10,
    paddingVertical: 2
  },
  button: {
    width: windowWidth / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default TasksScreen;
