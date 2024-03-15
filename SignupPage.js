import React , { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ImageBackground, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AlertModel from './AlertModel';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function SignupPage() {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmptyField = () => {
    return !firstName || !lastName || !username || !email || !password;
  };

  const handlePress = () => {
    console.log('create account button pressed');
    if (isEmptyField()) {
      console.log('one or more fields is empty');
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
    } else {
      console.log('all fields filled');
      // TODO: save the account
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        // TODO: we want to probably save the other information in a database or something (first name, last name, etc)
        const user = userCredential.user;
        navigation.navigate('SecondScreen'); // placeholder, just go to second screen for now
      })
      .catch((error) => {
        // Signup fail
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + ': ' + errorMessage);
      })
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.title}>Create Account</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />

      <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={text => setLastName(text)}
        />

      <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
        />

      <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />

      <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      

      <View style={styles.createButtonContainer}>
        <Pressable onPress={handlePress}>
          <ImageBackground source={require('./assets/button.png')} style={styles.createButton} resizeMode="contain">
            <Text style={styles.createButtonText}>Sign Up</Text>
          </ImageBackground>
        </Pressable>
      </View>
      <AlertModel visible={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontFamily: 'Poppins',
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  form: {
    flex: 1,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#70747E',
    marginTop: 10,
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 7.5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  createButtonContainer: {
    paddingHorizontal: 45,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 109,
    height: 31,
  },
  createButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 16.5,
    paddingRight: 25,
  },
});
