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
  SafeAreaView,
  Switch,
  I18nManager
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';
import { RNRestart } from "react-native-restart"
import IconBadge from 'react-native-icon-badge';

var notificationValue, deviceType;
var languageArray = []



class ProfileActivity extends Component {
  constructor(props) {
    super(props);
    this.displayProfile = this.displayProfile.bind(this);
    this.updateNotificationStatus = this.updateNotificationStatus.bind(this);
    this.updateProfileApi = this.updateProfileApi.bind(this);
    this.state = {
      JSONResult: '',
      email: '',
      Phoneno: '',
      name: '',
      userId: '',
      notificationstatus: '',
      password: '',
      status: '',
      wholeResult: '',
      switchValue: false,
      languageValue: false,
      selectedLanguage: '',
      updateprofileurl: 'https://ylaw.app/admin/app_api/customer_update_profile',
      baseUrl: 'https://ylaw.app/admin/app_api/get_cusomer_info',
      notification_url: 'https://ylaw.app/admin/app_api/update_notification_info',
      question_count: '',
      contract_count: '',
      notification_count: '',
    };
  }


  static navigationOptions = {
    title: 'Profile Screen',
  };

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  toggleSwitch = (value) => {
    if (value == true) {

      this.setState({ switchValue: value })
      notificationValue = "1"

    }
    else {
      //  console.log('Switch  is: else ')
      this.setState({ switchValue: value })
      notificationValue = "0"

    }

    this.showLoading();
    this.updateNotificationStatus();

  }


  toggleLanguageSwitch = (value) => {

    if (value == true) {

      this.setState({ languageValue: value })

      try {

        this.setState({ selectedLanguage: "Arabic" })
        AsyncStorage.setItem('@language', "Arabic");
      } catch (error) {
        console.log("Error saving data" + error);
      }

      //  stringsoflanguages.setLanguage("ar");
      //  I18nManager.forceRTL(true);
      // RNRestart.Restart();
      //  this.props.navigation.navigate('Splash', { JSON_Clicked_Item: value })

    }
    else {
      this.setState({ languageValue: value })

      try {
        this.setState({ selectedLanguage: "English" })
        AsyncStorage.setItem('@language', "English");
      } catch (error) {
        console.log("Error saving data" + error);
      }

      //   stringsoflanguages.setLanguage("en");
      //  I18nManager.forceRTL(false);  
      // RNRestart.Restart();


    }
    console.log("value===" + value);

  }


  componentDidMount = () => {
    this.props.navigation.addListener('willFocus', this.load)
    this.showLoading();

    AsyncStorage.getItem('@question_count').then((question_count) => {
      if (question_count) {
        this.setState({ question_count: question_count });
        console.log("question_count ====" + this.state.question_count);
      }
    });

    AsyncStorage.getItem('@contract_count').then((contract_count) => {
      if (contract_count) {
        this.setState({ contract_count: contract_count });
        console.log("contract_count ====" + this.state.contract_count);
      }
    });

    AsyncStorage.getItem('@notification_count').then((notification_count) => {
      if (notification_count) {
        this.setState({ notification_count: notification_count });
        console.log("notification_count ====" + this.state.notification_count);
      }
    });

    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
        console.log("user id ====" + this.state.userId);

        languageArray.push({ label: "English", value: "English" })
        languageArray.push({ label: "Arabic", value: "Arabic" })

        this.displayProfile();

      }
    });

  }



  updateProfile = () => {



    if (Platform.OS === 'ios') {
      deviceType = 'ios'
    } else {
      deviceType = 'android'
    }

    console.log("update profile pressed=======");
    this.showLoading();
    this.updateProfileApi();

  };


  load = () => {

    AsyncStorage.getItem('@user_id').then((userId) => {
      if (userId) {
        this.setState({ userId: userId });
        console.log("user id ====" + this.state.userId);
        this.showLoading();
        this.displayProfile();

      }
    });

  }



  displayProfile() {

    var url = this.state.baseUrl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
          if (responseData.language == null || responseData.language == "" || responseData.language == "Arabic") {
            this.setState({ selectedLanguage: "Arabic" })
            AsyncStorage.setItem('@language', "Arabic");
            this.setState({ languageValue: true })
          } else {
            this.setState({ selectedLanguage: responseData.language })
            AsyncStorage.setItem('@language', "English");
            this.setState({ languageValue: false })
          }

          if (responseData.email_id == null || responseData.email_id == "" )
          {
              // do nothing
          }else
          {
            this.setState({ email: responseData.email_id })
          }
       
          if (responseData.contact_no == null || responseData.contact_no == "" )
          {
              // do nothing
          }else
          {
            this.setState({ Phoneno: responseData.contact_no })
          }

          if (responseData.first_name == null || responseData.first_name == "" )
          {
             // do nothing
          }else
          {
            this.setState({ name: responseData.first_name })
          }

          this.setState({ notificationstatus: responseData.notification })

          
          if (this.state.notificationstatus == 1) {
            this.setState({ switchValue: true })
          }
          else {
            this.setState({ switchValue: false })
          }

        }


        console.log('response object:', responseData);

      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }


  updateNotificationStatus() {

    console.log("notification status===" + this.state.notificationstatus);
    var url = this.state.notification_url;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId,
        notification_id: notificationValue,

      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {
          alert(responseData.message);
          // this.props.navigation.navigate.goBack();
        }


        console.log('response object:', responseData);

      })
      .catch(error => {
        this.hideLoading();
        console.error(error);
      })

      .done();
  }

  updateProfileApi() {

    var url = this.state.updateprofileurl;
    console.log('url:' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secure_pin: 'digimonk',
        customer_id: this.state.userId,
        full_name: this.state.name,
        email_id: this.state.email,
        contact_no: this.state.Phoneno,
        device_type: deviceType,
        language: this.state.selectedLanguage,

      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.hideLoading();
        if (responseData.status == '0') {
          alert(responseData.message);
        } else {

          AsyncStorage.setItem('@fullname', responseData.first_name)

          console.log("responseData.first_name===" + responseData.first_name)

          
          console.log("responseData.contact_no===" + responseData.contact_no);
          if (responseData.contact_no == null || responseData.contact_no == "" )
          {
        // do nothing
          }else
          {
            AsyncStorage.setItem('@contact_no', responseData.contact_no.toString());
          }
          
          if (this.state.selectedLanguage == "Arabic") {
            stringsoflanguages.setLanguage("ar");
          }
          else {
            stringsoflanguages.setLanguage("en");
          }

          this.props.navigation.navigate('Splash');
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
          backgroundColor: '#0093c8', height: 60
        }}>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            backgroundColor={'white'}
            onPress={() => { this.props.navigation.goBack() }} >

            <Image
              source={require('../images/back_blue.png')}
              style={styles.backIconStyle} />

          </TouchableOpacity>


          <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
            onPress={() => { }} >

            <Text style={styles.screenntitlestyle}>{stringsoflanguages.my_profile}</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              if (this.state.islogin == '0') {
                this.props.navigation.navigate('Login')
              } else {
                this.props.navigation.navigate('Notification')
              }

            }} >

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <IconBadge
                MainElement={
                  <Image source={require('../images/notification.png')}
                    style={styles.notificationIconStyle}
                  />

                }
                BadgeElement={
                  <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                    {this.state.notification_count}
                  </Text>
                }
                IconBadgeStyle={
                  {
                    width: 23,
                    height: 23,
                    backgroundColor: 'red'
                  }
                }
                Hidden={this.state.notification_count == 0}
              />
            </View>

          </TouchableOpacity>
        </View>



        <ScrollView style={{ flexDirection: 'column', backgroundColor: 'white' }} >

          <View style={{
            flexDirection: 'column', backgroundColor: '#0093c8', borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20, height: 200, alignItems: 'center', elevation: 20,
            shadowColor: '#D0D0D0', justifyContent: 'center', shadowColor: 'black', width: '100%',
            shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
          }}>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{
                flex: .30, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center'
              }}
                onPress={() => { }} >

                <Image
                  source={require('../images/yys_shadow_logo-new.png')}
                  style={{ width: 100, height: 100, borderRadius: 100 / 2, marginLeft: 50, borderWidth: 2, borderColor: 'white' }}
                />

              </TouchableOpacity>


              <TouchableOpacity style={{
                flex: .60, flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', alignContent: 'center'
              }}
                onPress={() => { }} >

                <TextInput
                  placeholderTextColor="#4D4D4D"
                  onChangeText={name => this.setState({ name })}
                  placeholder={stringsoflanguages.full_name_placeholder}
                  underlineColorAndroid="transparent"
                  style={styles.inputwhite}
                  value={this.state.name}

                />
                {/* <Text style={styles.usernameStyle}>{this.state.name}</Text> */}


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  //  this.props.navigation.navigate('EditProfile') 

                }} >


                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editiconStyle} />

              </TouchableOpacity>

            </View>

          </View>

          <View style={{
            flexDirection: 'column', backgroundColor: 'white', borderRadius: 20, marginTop: 10,
            alignSelf: 'center', marginBottom: 70,
            height: 320, width: '97%', alignItems: 'center', elevation: 20, shadowColor: 'black',
            shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
          }}>


            <View style={{
              flexDirection: 'row', marginTop: 10, alignItems: 'center',
              justifyContent: 'center', marginTop: 50
            }}>

              <TouchableOpacity style={{
                flex: .15, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center', marginLeft: 15
              }}
                onPress={() => { }} >

                <Image source={require('../images/email_blue.png')}
                  tintColor={'#0093C8'}
                  style={styles.EmailIconStyle} />


              </TouchableOpacity>



              <TouchableOpacity style={{ flex: .60 }}
                onPress={() => { }} >

                <TextInput
                  placeholderTextColor="#4D4D4D"
                  onChangeText={email => this.setState({ email })}
                  placeholder={stringsoflanguages.email_placeholder}
                  editable={false}
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  value={this.state.email}



                />

              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >

                {/* 
                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editinfoiconStyle} /> */}


              </TouchableOpacity>


            </View>

            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0093c8" />
              </View>
            )}

            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity style={{
                flex: .15, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center', marginLeft: 15
              }}
                onPress={() => { }} >

                <Image source={require('../images/call.png')}
                  tintColor={'#0093C8'}
                  style={styles.EmailIconStyle} />


              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .60 }}
                onPress={() => { }} >

                <TextInput
                  placeholder={stringsoflanguages.enter_mobile_no}
                  placeholderTextColor="#4D4D4D"
                  underlineColorAndroid="transparent"
                  keyboardType='number-pad'
                  style={styles.inputphoneno}

                  onChangeText={Phoneno => this.setState({ Phoneno })}
                  value={this.state.Phoneno}

                />


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              // onPress={() => { this.props.navigation.navigate('EditProfile') }}
              >


                <Image
                  source={require('../images/edit_grey.png')}
                  style={styles.editinfoiconStyle} />

              </TouchableOpacity>


            </View>




            <View style={{
              flexDirection: 'row', marginTop: 13, alignItems: 'center', justifyContent: 'center'
            }}>

              <TouchableOpacity style={{
                flex: .15, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center', marginLeft: 15
              }}
                onPress={() => { }} >

                <Image source={require('../images/notification.png')}
                  style={styles.ImageIconStyle}
                />


              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .60 }}
                onPress={() => { }} >

                <Text style={{ color: '#4D4D4D', marginLeft: 10, fontSize: RFPercentage(2), textAlign: 'left' }}>{stringsoflanguages.notification_small}</Text>


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Switch
                  onValueChange={this.toggleSwitch}
                  value={this.state.switchValue} />

              </TouchableOpacity>

            </View>


            <View style={{
              flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'
            }}>

              <TouchableOpacity style={{
                flex: .15, alignItems: 'center', justifyContent: 'center',
                alignContent: 'center', marginLeft: 15
              }}
                onPress={() => { }} >

                <Image source={require('../images/change_language.png')}
                  style={styles.ImageIconStyle}
                />


              </TouchableOpacity>


              <TouchableOpacity style={{ flex: .60 }}
                onPress={() => { }} >


                <Text style={{ color: '#4D4D4D', marginLeft: 10, fontSize: RFPercentage(2), textAlign: 'left' }}>{this.state.selectedLanguage}</Text>


              </TouchableOpacity>

              <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }} >


                <Switch
                  onValueChange={this.toggleLanguageSwitch}
                  value={this.state.languageValue} />

              </TouchableOpacity>

            </View>

            <TouchableOpacity
              style={styles.expertButtonStyle}
              activeOpacity={.5}
              onPress={() => { this.updateProfile() }}>

              <Text style={styles.experttext}>{stringsoflanguages.update_profile} </Text>

            </TouchableOpacity>




          </View>


        </ScrollView>


        <View style={{
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',

        }}>


          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
            height: 60, borderRadius: 30, margin: 5, shadowColor: '#ecf6fb', elevation: 20,
            shadowColor: 'grey', elevation: 20,
            shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1
          }}>

            <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
              onPress={() => { this.props.navigation.navigate('Dashboard') }}>

              <Image source={require('../images/home.png')}
                style={styles.StyleHomeTab} />

              <Text style={styles.bottomactivebuttonstyle}>{stringsoflanguages.home_menu}</Text>

            </TouchableOpacity>


            <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
              onPress={() => {
                if (this.state.islogin == '0') {
                  this.props.navigation.navigate('Login')
                } else {
                  this.props.navigation.navigate('QuestionLog')
                }
              }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <IconBadge
                  MainElement={
                    <Image source={require('../images/question-inactive.png')}
                      style={styles.StyleQuestionsTab} />
                  }
                  BadgeElement={
                    <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                      {this.state.question_count}
                    </Text>
                  }
                  IconBadgeStyle={
                    {
                      width: 23,
                      height: 23,
                      marginRight:20,
                      backgroundColor: 'red'
                    }
                  }
                  Hidden={this.state.question_count == 0}
                />
                <Text style={styles.bottomquestiontextstyle}>{stringsoflanguages.questions}</Text>
              </View>



            </TouchableOpacity>

            <View style={{
              position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff',
              width: 70, height: 100, bottom: 5, zIndex: 10
            }}>

              <View style={{ flex: 1 }}>
              <ActionButton
                                    buttonColor="#0094CD"
                                    onPress={() => {

                                        this.props.navigation.navigate('Dashboard')
        
                                    }}>

                  {/* <ActionButton.Item buttonColor='#fffff' title="New Task" >

                  </ActionButton.Item>
                  <ActionButton.Item buttonColor='#fffff'
                    title="Notifications" >

                    <Image source={require('../images/chat_anim_menu.png')}
                      style={styles.animationIconStyle} />
                  </ActionButton.Item>

                  <ActionButton.Item buttonColor='#fffff'
                    title="Notifications">

                    <Image source={require('../images/question_anim_menu.png')}
                      style={styles.animationIconStyle} />
                  </ActionButton.Item>

                  <ActionButton.Item buttonColor='#fffff'
                    title="Notifications">


                  </ActionButton.Item> */}

                </ActionButton>
              </View>
            </View>


            <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}
              onPress={() => {
                if (this.state.islogin == '0') {
                  this.props.navigation.navigate('Login')
                } else {
                  this.props.navigation.navigate('contractLog')
                }
              }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <IconBadge
                  MainElement={
                    <Image source={require('../images/contract-inactive.png')}
                      style={styles.styleContractTab} />
                  }
                  BadgeElement={
                    <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                      {this.state.contract_count}
                    </Text>
                  }
                  IconBadgeStyle={
                    {
                      width: 23,
                      height: 23,
                      marginLeft:20,
                      backgroundColor: 'red'
                    }
                  }
                  Hidden={this.state.contract_count == 0}
                />
                <Text style={styles.bottomcontracttextstyle}>{stringsoflanguages.contracts}</Text>
              </View>



            </TouchableOpacity>


            <TouchableOpacity style={{ flex: .25, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
              onPress={() => {

                this.props.navigation.navigate('Contactus')

              }}>

              <Image source={require('../images/support-inactive.png')}
                style={styles.StyleContactusTab} />

              <Text style={styles.bottominactivebuttonstyle}>{stringsoflanguages.contactus_menu}</Text>

            </TouchableOpacity>

          </View>
        </View>

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
    //backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0093c8'
  },
  screenntitlestyle: {
    color: "white",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  ImageIconStyle: {
    marginTop: 3,
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIconStyle: {
    tintColor: '#f5f6f6',
    marginTop: 10,
    marginLeft: 10,
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconStyle: {
    marginTop: 3,
    height: 25,
    alignSelf: 'center',
    alignItems: 'center',
    tintColor: 'white',
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
  input: {
    color: 'black',
    height: 40,
    borderWidth: 0,
    marginLeft: 5,
    width: '80%',
    textAlign: 'left',
    fontSize: RFPercentage(2),
    textAlignVertical: 'bottom',
    backgroundColor: 'transparent'
  },
  inputphoneno: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: 'black',
    height: 40,
    borderWidth: 0,
    marginLeft: 5,
    width: '80%',
    textAlign: 'left',
    fontSize: RFPercentage(2),
    textAlignVertical: 'bottom',
    backgroundColor: 'transparent'
  },
  inputwhite: {
    color: 'white',
    height: 40,
    borderWidth: 0,
    marginLeft: 60,
    width: '80%',
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: RFPercentage(2),
    textAlignVertical: 'bottom',
    backgroundColor: 'transparent'
  },
  ImagelockIconStyle: {
    height: 25,
    width: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  EmailIconStyle: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameStyle: {
    color: "white",
    fontSize: 22
  },
  editiconStyle: {
    height: RFPercentage(2.5),
    width: RFPercentage(2.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: 'white'
  },
  editinfoiconStyle: {
    height: RFPercentage(2.5),
    width: RFPercentage(2.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  expertButtonStyle: {
    marginTop: 15,
    width: 300,
    height: 50,
    fontWeight: 'bold',
    borderRadius: 8,
    borderColor: '#0093c8',
    borderWidth: 2,
    fontSize: RFPercentage(10),
    backgroundColor: '#0093c8',
    justifyContent: 'center',
    alignSelf: 'center',
    // Setting up View inside component align horizontally center.
    alignItems: 'center',
  },
  experttext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  // badgeImageIconStyle: {
  //   marginTop: 10,
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  bottomactivebuttonstyle: {
    color: "#0094CD",
    fontSize: 7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottominactivebuttonstyle: {
    color: "#887F82",
    fontSize: 7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  StyleHomeTab: {
    marginTop: 5,
    width: 35,
    height: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
StyleQuestionsTab: {
    marginTop: 11,
    marginRight:20,
    width: 30,
    height: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
badgeImageIconStyle: {
  marginTop: 5,
  width: 35,
  height: 35,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
styleContractTab: {
  marginTop: 9,
  width: 21,
  height: 30,
  marginLeft:20,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
StyleContactusTab: {
  marginTop: 14,
  width: 28,
  height: 28,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
bottomquestiontextstyle: {
  color: "#887F82",
  fontSize: 7,
  marginRight:20,
  textAlign: 'center',
  fontWeight: 'bold',
},
bottomcontracttextstyle: {
  color: "#887F82",
  fontSize: 7,
  marginLeft:20,
  textAlign: 'center',
  fontWeight: 'bold',
},
});

export default ProfileActivity;
