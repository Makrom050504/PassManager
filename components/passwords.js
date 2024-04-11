import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { createTable, insertPassword, getAllPasswords, deletePassword, editPassword } from './Database';
import { Button, Divider } from "@react-native-material/core";
import image from "../gfx/Image.png";
import { useFocusEffect } from '@react-navigation/native';

export default class Passwords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            website: "",
            username: "",
            password: "",
            passwords: [],
           
        };
    }

    componentDidMount() {
        this.fetchData();
        this.props.navigation.addListener('focus', this.fetchData); 
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.fetchData); 
    }
    
    fetchData = () => {
        createTable();
        getAllPasswords().then((data) => {
            console.log(data);
            this.setState({ passwords: data });
        });
    };

    savePassword = () => {
        const { website, username, password, editing, editIndex, passwords } = this.state;

        if (!website || !username || !password) {
            alert("Please fill out all fields!");
            return;
        }

        if (editing && editIndex !== null) {
            editPassword(passwords[editIndex].id, website, username, password);
        } else {
            insertPassword(website, username, password); 
        }
        this.fetchData(); // Fetch data after saving password
    };

    renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.passwordItem} onPress={() => this.props.navigation.navigate("One", { data: item})}>
            <View style={styles.listItem}>
                
                <Text style={styles.listValue}>{item.website}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        const { website, username, password, passwords, editing } = this.state;

        return (
            <ImageBackground source={image} style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.header}>Password Manager</Text>
                   <Divider style={{ marginTop: 0}} leadingInset={-20} trailingInset={-20} color="#ad035e"></Divider>
                    <Text style={styles.passwordzik}>Websites:</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        directionalLockEnabled={true}
                        alwaysBounceVertical={false}
                        style={{height: 170, width: 400, alignSelf: 'flex-start'}}
                    >
                        <FlatList
                            contentContainerStyle={{alignSelf: 'flex-start'}}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={passwords}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </ScrollView>
                    <Text style={styles.passwordzik}>Add a Password</Text>
                    <TextInput
                        style={styles.input1}
                        placeholder="Website"
                        value={website}
                        onChangeText={(text) => this.setState({ website: text })}
                    />
                    <TextInput
                        style={styles.input2}
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => this.setState({ username: text })}
                    />
                    <TextInput
                        style={styles.input3}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                    <Button style={styles.submitButton} title={"Add Password"} onPress={this.savePassword}>
                        <Text style={styles.submitButtonText}></Text>
                    </Button>
                    
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        margin: 15,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#333",
    },
    passwordzik: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    passwordItem: {
        flexDirection: "column",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "pink",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "black",
        opacity: 0.6,
        width: 150,
        color: "white",
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 10,
    },
    listLabel: {
        fontWeight: "bold",
        marginBottom: 5,
        color: "white",
        fontSize: 19,
    },
    listValue: {
        flex: 1,
        fontSize: 18,
        color: "white",
        paddingLeft: 10,
    },
    input1: {
        borderWidth: 2,
        borderColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        width: 150,
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: "white",
        left: 100,
    },
    input2: {
        borderWidth: 2,
        borderColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        width: 150,
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: "white",
        top: -8,
        left: 15,
    },
    input3: {
        borderWidth: 2,
        borderColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        width: 150,
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: "white",
        top: -80,
        left: 190,
    },
    submitButton: {
        backgroundColor: "purple",
        color: "white",
        fontWeight: "bold",
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    submitButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
    },
});
