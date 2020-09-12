import React, { useState } from 'react'
import { StyleSheet, Text, View,Image ,TextInput,TouchableOpacity,Alert, ActivityIndicator} from 'react-native'
import Button from '../components/Button';
import {firebase} from '../firebase/config.js';



export default function Login({navigation}) {
     const [email ,setEmail]=useState(null);
     const [password ,setPassword]=useState(null);
     const [loading, setLoading]=useState(false);

     const login=()=>{
         if(!email || !password){
            return Alert.alert("Error", "You need to fill in the inputs",[{text:"Ok",onPress :() =>{}},
        ]);
         }
         setLoading(true);
         firebase
         .auth()
         .signInWithEmailAndPassword(email ,password)
         .then(res=>{
            //  console.log("res ",res);
             setLoading(false);
         }).catch(error=>{
            //  console.log("err",error);
             alert(error);
             setLoading(false);
         })

     };

    return (
        <View style={{flex:1,backgroundColor:"#fff"}}>
           <View style={{alignSelf:"center",marginTop:100}}>
              <Image source={require("../../assets/favicon.png")}/>
              
           </View>
           <View style={styles.form}>
           
           <TextInput onChangeText={(text)=>setEmail(text)} placeholder="Email" style={styles.input} autoCapitalize="none"/>
           <TextInput onChangeText ={(text)=>setPassword(text)} placeholder="Password" style={styles.input} secureTextEntry={true}/>

           {loading ? ( <ActivityIndicator/> ) : (
            <Button onPress={login} title="Login" backgroundColor="blue" />   )
           }
              
           
           </View>
           <View style={styles.signupView}>
               <TouchableOpacity onPress={()=>navigation.navigate("Signup")} style={{padding:20}}>
                <Text>Don't have an accound?{" "}<Text style={{color: "blue", fontWeight:"bold"}}>Sign up</Text></Text>

               </TouchableOpacity>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form:{
        marginHorizontal:35,
        marginTop:40,
        
    
    },
    input:{
        height:60,
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        marginBottom:30,

    },
    signupView:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",

    },
});
