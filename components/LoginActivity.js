import React, { Component } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  AppRegistry,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


var deviceType;



class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.logincall = this.logincall.bind(this);
    this.state = {
      JSONResult: '',
      email: '',
      password: '',
      status: '',
      wholeResult: '',
      loading: '',
      baseUrl: 'http://203.190.153.22/yys/admin/app_api/customer_login'
    };
  }


  static navigationOptions = {
    title: 'Login Screen',
  };

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.email != '') {
      //Check for the Name TextInput
      if (this.state.password != '') {
        //Check for the Email TextInput
        if (Platform.OS === 'ios') {
          deviceType = 'ios'
        } else {
          deviceType = 'android'
        }

       // this.showLoading();
        this.logincall();

      } else {
        alert('Please Enter Password');
      }
    } else {
      alert('Please Enter email');
    }
  };

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }


  logincall() {
   
    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        email_id: this.state.email,
        password: this.state.password,
        device_type: deviceType,
        device_token: '123'
      }),
    })
      .then(response => response.json())
      .then(responseData => {
     //   this.hideLoading();
   
       this.saveLoginUserData(responseData);
      
        this.props.navigation.navigate('Dashboard') 
     
        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }

  async saveLoginUserData(responseData) {
    try {
      await AsyncStorage.setItem('@user_id', responseData.id.toString());
      await AsyncStorage.setItem('@email', responseData.email_id.toString());
      await AsyncStorage.setItem('@fullname', responseData.full_name.toString());
      await AsyncStorage.setItem('@is_login', "1");
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

 

  render() {
    return (
      <ImageBackground style={styles.imgBackground}
        resizeMode='cover'
        source={require('../images/bg.png')}>

        <SafeAreaView style={styles.container}>


          <ScrollView>


            <Image style={styles.headerLogo}
              source={require('../images/yys_shadow_logo.png')}>

            </Image>


            <Text style={styles.headerdescription}>SPONSORED BY YYS LEGAL FIRM OFFICE</Text>


            <View style={styles.datacontainer}>

              <View style={styles.SectionStyle}>

                <Image source={require('../images/email.png')}
                  style={styles.ImageIconStyle} />

                <TextInput
                  placeholderTextColor="#C7E8F2"
                  onChangeText={email => this.setState({ email })}
                  placeholder={'Email'}
                  underlineColorAndroid="transparent"
                  style={styles.input}
                />

              </View>

              <View style={styles.SectionStyle}>

                <Image source={require('../images/lock.png')}
                  style={styles.ImagelockIconStyle} />


                <TextInput
                  placeholder={'Password'}
                  placeholderTextColor="#C7E8F2"
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />

              </View>


              <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forget Password?</Text>
              <Text style={styles.normalText} onPress={() => this.props.navigation.navigate('Signup')}>Don't have an account?  Create now</Text>


              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={.5}
                onPress={this.CheckTextInput}>


                <Text style={styles.fbText}> LOGIN </Text>

              </TouchableOpacity>

              <Text style={styles.skipbrowseText} onPress={() => this.props.navigation.navigate('Dashboard')}>Skip & Browse</Text>


            </View>
          </ScrollView>


        </SafeAreaView>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    //backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  datacontainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    marginTop: 30,
    fontSize: 120,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  headerdescription: {
    fontSize: RFValue(10, 580),
    textAlign: 'center',
    color: '#FFFFFF'
  },
  input: {
    color: '#ffffff',
    width: 300,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  normalText: {
    fontSize: RFPercentage(2),
    textAlign: 'right',
    color: '#F0F5FE',
    marginRight: 35,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
  SubmitButtonStyle: {
    marginTop: 50,
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#E88000',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    // Setting up View inside component align horizontally center.
    alignItems: 'center',
    fontWeight: 'bold',
  },
  skipbrowseText: {
    fontSize: 20,
    textAlign: 'right',
    color: '#F0F5FE',
    marginRight: 43,
    marginTop: 30,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  },
  fbText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    alignContent: 'center',
    fontWeight: 'bold'
  },

  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },

  headerLogo: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  ImageIconStyle: {
    height: 20,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImagelockIconStyle: {
    height: 30,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#C7E8F2',
    height: 40,
    borderRadius: 5,
    borderBottomWidth: 1,
    margin: 10,
    flexDirection: 'row'
  },
});

export default LoginActivity;