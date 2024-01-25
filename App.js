import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [completedTasks, setCompletedTasks] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);

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
    setTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
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

  const renderItem = ({ item, index }) => (
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
