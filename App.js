import React, { useState, useEffect } from  'react';
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Keyboard } from 'react-native';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({x:0, y:95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x:160, y:165}));

  useEffect(()=>{

    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue:0,
        speed:4,
        bounciness:20
      }),
      Animated.timing(opacity, {
        toValue:1,
        duration:200
      })
    ]).start();
    
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue:75,
        duration:100,
      }),
      Animated.timing(logo.y, {
        toValue:85,
        duration:100,
      })
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue:160,
        duration:100,
      }),
      Animated.timing(logo.y, {
        toValue:165,
        duration:100,
      })
    ]).start();
  }

  return(
    <KeyboardAvoidingView style={styles.backGroud}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width:logo.x,
            height:logo.y,
          }}
          source={require('./src/assets/logo.png')}
        />
      </View>
      <Animated.View 
        style={
          [
            styles.container, 
            {
              opacity:opacity,
              transform:[
                {translateY:offset.y}
              ]
            }
          ]
        }
      >
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          autoCorrect={false}
          onChangeText={()=>{}}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={()=>{}}
        />

        <TouchableOpacity style={styles.btnLogar}>
          <Text style={styles.txtLogar}>Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCriarConta}>
          <Text>Criar conta gratuita</Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backGroud:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#DCDCDC',
  },
  containerLogo:{
    flex:1,
    justifyContent:'center',
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'90%',
    paddingBottom:50,
  },
  input:{
    backgroundColor:'#fff',
    width:'90%',
    marginBottom:15,
    color:'#222',
    fontSize:17,
    borderRadius:7,
    padding:10,
  },
  btnLogar:{
    backgroundColor:'#4169E1',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:7,

  },
  txtLogar:{
    color:'#fff',
    fontSize:18,
  },
  btnCriarConta:{
    marginTop:10
  }
});