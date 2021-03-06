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
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';


var deviceType;


class TermsConditionsActivity extends Component {
  constructor(props) {
    super(props);
    this.termscall = this.termscall.bind(this);
    this.state = {
      JSONResult: '',
      terms_content:'',
      status: '',
      wholeResult: '',
      languageType:'',
      selectedLanguage:'',
      baseUrl: 'https://ylaw.app/admin/app_api/get_content'
    };
  }


  static navigationOptions = {
    title: 'About us Screen',
  };


  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }


  componentDidMount() {

    AsyncStorage.getItem('@language').then((selectedLanguage) => {
      if (selectedLanguage) {
        if(selectedLanguage=="English")
        {
          stringsoflanguages.setLanguage("en");
        }else{
          stringsoflanguages.setLanguage("ar");
        }

      }
    });

    AsyncStorage.getItem('@language').then((languageType) => {
      if (languageType) {
          this.setState({ languageType: languageType });
          console.log("language type ====" + this.state.languageType);
         this.showLoading();
         this.termscall();
      }
  });

  }

  termscall() {
  
    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        language: this.state.languageType
        
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
 
           this.setState({terms_content: responseData.content_array[1].content})
         
        }


        console.log('response object:', responseData);
      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }




  render() {
    return (

      <SafeAreaView style={styles.container}>

        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
         height: 60
        }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.goBack() }} >


            <Image
              source={require('../images/back_blue.png')}

              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

      <Text style={styles.screenntitlestyle}>{stringsoflanguages.terms_of_services}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { this.props.navigation.navigate('Notification') }}
             >

            <Image
              source={require('../images/notification.png')}
              style={styles.ImageIconStyle}
            />

          </TouchableOpacity>
        </View>

        <ScrollView style={{ flexDirection: 'column' }} >


          <View style={{ flexDirection: 'row' }}>

            <ScrollView style={{ flexDirection: 'column'}} >


              {this.state.loading && (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#0093c8" />
                </View>
              )}

              <Text style={{ color: '#4d4d4d', marginLeft: 10, marginRight: 10,  marginTop:10 }}>
                 {this.state.terms_content}

              </Text>

            </ScrollView>



          </View>

        </ScrollView>

      </SafeAreaView >


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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5FE'
  },
  screenntitlestyle: {
    color: "#0093c8",
    fontSize: 20,
    textAlign: 'center'
  },
  ImageIconStyle: {
    marginTop: 3,
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconStyle: {
    marginTop: 3,
    height: 25,
    width: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datacontainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
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
  animationIconStyle: {
    marginTop: 3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default TermsConditionsActivity;
