import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground } from 'react-native';
import { updatePassword, fetchUserDataById, searchPasswordByWebsite, deletePasswordByWebsite } from './Database';
import { Button } from "@react-native-material/core";
import image from "../gfx/Image.png";

export default class One extends Component {
  constructor(props) {
    super(props);
    this.state = {
      website: this.props.route.params.data.website,
      username: this.props.route.params.data.username,
      password: this.props.route.params.data.password,
      isEditing: false,
      showPassword: false, // New state variable to track if password should be shown
    };
  }

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleSave = () => {
    const { website, username, password } = this.state;
    const { data } = this.props.route.params;

    updatePassword(data.id, username, password)
      .then(() => {
        console.log("Password updated successfully");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
      });

    this.setState({ isEditing: false });
  };

  componentDidMount() {
    searchPasswordByWebsite(this.props.route.params.data.website)
      .then((data) => {
        const [username, password] = data;
        this.setState({ username: username, password: password });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  deletePassword = () => {
    deletePasswordByWebsite(this.props.route.params.data.website)
    .then(() => {
      console.log("Password deleted successfully");
      this.props.navigation.navigate('Passwords', { dupa: true });
    })
    .catch((error) => {
      console.error("Error deleting password:", error);
    });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { website, username, password, isEditing, showPassword } = this.state;

    return (
      <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
        <View style={{ marginTop: 10, padding: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#ad035e" }}>Website: {website}</Text>
          {isEditing ? (
            <>
              <TextInput
                style={{ borderWidth: 1,color: "white", borderColor: '#ad035e', marginTop: 10 }}
                value={username}
                onChangeText={(text) => this.setState({ username: text })}
              />
              <TextInput
                style={{ borderWidth: 1,color: "white", borderColor: '#ad035e', marginTop: 10 }}
                value={password}
                onChangeText={(text) => this.setState({ password: text })}
              />
              <Button title="Save" style={{ backgroundColor: "purple", color: "white", fontWeight: "bold", marginTop: 10, borderRadius: 10, paddingVertical: 15, paddingHorizontal: 30 }} onPress={this.handleSave} />
            </>
          ) : (
            <>
              <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#ad035e" }}>Username: {username}</Text>
              {showPassword && <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#ad035e" }}>Password: {password}</Text>}
              <Button title={showPassword ? "Hide Password" : "Show Password"} style={{ backgroundColor: "purple", color: "white", fontWeight: "bold", borderRadius: 10, width: 200, alignSelf: 'center', paddingVertical: 15, paddingHorizontal: 30 }} onPress={this.togglePasswordVisibility} />
              <Button title="Edit" style={{ backgroundColor: "purple", color: "white", fontWeight: "bold", borderRadius: 10, width: 200, alignSelf: 'center', marginTop: 10, paddingVertical: 15, paddingHorizontal: 30 }} onPress={this.handleEdit} />
              <Button title="Delete" style={{ backgroundColor: "purple", color: "white", fontWeight: "bold", borderRadius: 10, width: 200, alignSelf: 'center', marginTop: 10, paddingVertical: 15, paddingHorizontal: 30 }} onPress={this.deletePassword} />
            </>
          )}
        </View>
      </ImageBackground>
    );
  }
}
