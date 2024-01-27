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

const Comment = (props) => {


    const [comment, setComment] = useState("");
    const [comments, setComments] = useState({ 'index': -1, 'comments': [] });

    const addComment = () => {
        setComments({ 'index': props.index, 'comments': [...comments.comments, comment] });
        // console.log(comments);
    }


    return (
        <View>
            <TextInput
                multiline
                placeholder="Enter task"
                value={comment}
                onChangeText={(text) => setComment(text)}>
            </TextInput>
            <Button onPress={addComment} title="Submit"></Button>

            <View>
                <FlatList
                    data={comments.comments}
                    renderItem={({ item }) => <Text style={{ padding: 5, borderWidth: 1, }}>{item}</Text>}
                />
            </View>
            {/* <Text>Hello </Text> */}
        </View >
    )
}

export default Comment;