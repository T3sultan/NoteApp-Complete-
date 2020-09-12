import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Alert,ActivityIndicator,TextInput, TouchableOpacity } from 'react-native'

import Button from '../components/Button';
import {firebase} from '../firebase/config.js'


export default function Signup({navigation}) {
    const [name,setName]=useState(null);
    const [email, setEmail]=useState(null);
    const [password, setPassword]=useState(null);
    const [Confirmpassword,setConfirmPassword]=useState(null); 
   
    const [loading,setLoading]=useState(false)

    const signup=()=>{
        if(!name || !email || !password || !Confirmpassword){
            return Alert.alert("Error","You need to fill up all condition",[{text:"Ok",onPress:()=>{

            }},
        ])
        }
        if(password !== Confirmpassword){
            return Alert.alert("Error","Confirm Password should be same as password",[{text:"Ok",onPress:()=>{

            }}])
        }
       setLoading(true)

        firebase.auth().createUserWithEmailAndPassword(email ,password)
        .then((response)=>{
            // console.log("response", response);
            setLoading(false);
         
            //first step->get user id
            const uid=response.user.uid;
            //second step->user the profile data
            const userProfileData={
                id:uid,
                email:email,
                name:name,
            };
            //third step->user profile collections
            const userRef=firebase.firestore().collection('users');
            //fourth step->save it to cloud
            userRef.doc(uid).set(userProfileData);

        }).catch(error=>{
            console.log("error",error);
            setLoading(false);
            alert(error);
        })
        
    };
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
           <View style={{alignSelf:"center",margin:90}}>
               <Image source={require("../../assets/favicon.png")}/>
           </View>
           <View style={styles.form}>
               <TextInput onChangeText={(text)=>setName(text)} placeholder="Name" style={styles.input}/>
               <TextInput onChangeText={(text)=>setEmail(text)} placeholder="Email" style={styles.input} autoCapitalize="none"/>
               <TextInput onChangeText={(text)=>setPassword(text)} placeholder="Password" style={styles.input } secureTextEntry={true}/>
               <TextInput onChangeText={(text)=>setConfirmPassword(text)} placeholder="Confirm password" style={styles.input} secureTextEntry={true}/>
               {/* <TextInput onChangeText={(text)=>setAge(text)} placeholder="Age" style={styles.input}/> */}
               {/* <TextInput onChangeText={(text)=>setGender(text)} placeholder="Gender" style={styles.input}/> */}
               {/* <TextInput onChangeText={(text)=>setDateOfBirth(text)} placeholder="Date of birth" style={styles.input}/> */}
                 
                 {loading ? (<ActivityIndicator/>
                 ) 
                 :
                   ( <Button onPress={signup} title="Sign up" backgroundColor="blue"/>
                   )
                 
                 }

               
           </View>
           <View style={styles.signUpView}>

               <TouchableOpacity onPress={()=>navigation.goBack()}
               style={{padding:20}}>
                   <Text style={{fontSize:16}}>
                       Already have an account?<Text style={{color:"blue",fontWeight:"bold"}}>Sign in</Text>
                   </Text>
               </TouchableOpacity>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form:{
        marginHorizontal:40,
        marginTop:20
    },
    input:{
        height:30,
        borderColor:"#ddd",
        borderEndWidth:1,
        marginBottom:20
    },
    signUpView:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center"

    }
   
})
