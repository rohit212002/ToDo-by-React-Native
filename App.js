import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
} from "react-native";

import Comment from "./Comment";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [completedTasks, setCompletedTasks] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(-1);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    console.log(taskToEdit);
    setTask(taskToEdit);
    // console.log(index);

    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    const updatedCompletedTasks = { ...completedTasks };
    updatedTasks.splice(index, 1);
    delete updatedCompletedTasks[index];

    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
  };

  const toggleTaskCompletion = (index) => {
    setCompletedTasks({
      ...completedTasks,
      [index]: !completedTasks[index],
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = tasks.filter((task) =>
      task.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const toggleSearchMode = () => {
    setIsSearchMode(!isSearchMode);
    if (!isSearchMode) {
      setShowAddTask(true);
    }
  };

  const renderInputBox = () => {
    if (isSearchMode) {
      return (
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      );
    } else {
      return (
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
      );
    }
  };

  const renderActionButton = () => {
    if (!isSearchMode && showAddTask) {
      return (
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>
            {editIndex !== -1 ? "Update Task" : "Add New Task"}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const handleDetails = (index) => {

    console.log(tasks[index]);
    setSelectedTask(index);


  }

  const renderItem = ({ item, index }) => (
    <View style={{ borderWidth: 1, marginBottom: 10, borderBlockColor: "grey", padding: 4, borderRadius: 4, }}>
      <View style={[styles.task, completedTasks[index] && styles.completedTask]}>
        <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
          <Text style={styles.checkbox}>{completedTasks[index] ? "☑" : "☐"}</Text>
        </TouchableOpacity>
        <Text style={styles.itemList}>{item}</Text>
        <View style={styles.taskButtons}>
          <TouchableOpacity onPress={() => handleEditTask(index)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(index)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>

        </View>
      </View>

      <TouchableOpacity onPress={() => handleDetails(index)} >
        <Text style={styles.DetailsButton}>Details</Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ToDO App</Text>
      <TouchableOpacity style={styles.searchButton} onPress={toggleSearchMode}>
        <Text style={styles.searchButtonText}>
          {isSearchMode ? "Cancel Search" : "Search"}
        </Text>
      </TouchableOpacity>
      {renderInputBox()}
      {renderActionButton()}
      <FlatList
        data={searchQuery ? filteredTasks : tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal visible={selectedTask !== -1}>
        <View style={{ paddding: 16, }}>
          <Text>{tasks[selectedTask]}</Text>
          <Button onPress={() => { setSelectedTask(-1) }} title="Close"></Button>

          <Comment index={selectedTask} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  heading: {
    marginLeft: 60,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "grey",
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: 'rgba(111, 202, 186, 1)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  completedTask: {
    backgroundColor: "lightgreen",
  },
  itemList: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },

  DetailsButtonButton: {
    flex: 1,
    direction: "column",
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  checkbox: {
    fontSize: 20,
  },
  searchButton: {
    backgroundColor: 'rgba(111, 202, 186, 1)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  searchInput: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
});

export default App;
