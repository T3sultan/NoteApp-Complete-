import React, { useState } from 'react'
import { StyleSheet, Text, View,TextInput, ActivityIndicator, TouchableOpacity  } from 'react-native'

import Button from '../components/Button';
import {firebase} from '../firebase/config';

export default function Create({route,navigation}) {
    const [note,setNote]=useState(null);
    const [loading, setLoading]=useState(false);
    const userId=route.params.userId;
    const noteRef=firebase.firestore().collection("notes");

    const onSave=()=>{
        if(note && note.length>0){
        
            setLoading(true);
           
            const timetamp=firebase.firestore.FieldValue.serverTimestamp();

           
            const data={
                description:note,
                authorId:userId,
                createdAt:timetamp,
            };

           
            return noteRef.add(data).then((_doc)=>{
                setNote(null);
                setLoading(false);
                navigation.goBack();
                
            }).catch(err=>{
                console.log(err);
                setLoading(false);
            })

        }
        return alert("note is empty");
    }
    return (
        <View style={{flex:1}}>
        <View style={styles.wrapper}>
        <Text style={styles.tittle}>Create Notes</Text>
        <TextInput onChangeText={(text)=>setNote(text)} 
        placeholder="write your notes" 
        style={styles.input} 
        value={note}
        />
        

        {loading ? (<ActivityIndicator/> ):(
            <Button title="Save" backgroundColor="blue" onPress={onSave}/>
        )


        }
        
        </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        margin:35,
    },
    tittleWrapper:{
        justifyContent:'space-between',
        flexDirection:"row",
        alignItems:"center",
       
    },
    tittle:{
        fontSize:20,
        fontWeight:"bold",

    },
    input:{
        height:80,
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        marginTop:40

    }
})
