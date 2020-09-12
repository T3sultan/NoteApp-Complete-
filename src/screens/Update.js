import React, { useState } from 'react'
import { StyleSheet, Text, View,TextInput, ActivityIndicator } from 'react-native'
import Button from '../components/Button';
import {firebase} from '../firebase/config';

export default function Update({route,navigation}) {
    const userId=route.params.userId;
    const item=route.params.item;
    const noteRef=firebase.firestore().collection("notes");

    const [note,setNote]=useState(item.description);
    const [loading, setLoading]=useState(false);
    

    const onUpdate=()=>{
        if(note && note.length>0){
           
            setLoading(true);
         

            return noteRef.doc(item.id).update({description : note}).then(()=>{
                setLoading(false);
            }).catch((err)=>{
                setLoading(false);
            })
            

        }
        return alert("note is empty");
    };
    return (
        <View style={{flex:1}}>
        <View style={styles.wrapper}>
        <Text style={styles.tittle}>Edit Notes</Text>
        <TextInput onChangeText={(text)=>setNote(text)} 
        placeholder="Write down your notes" 
        style={styles.input} 
        value={note}
        />

        {loading ? (<ActivityIndicator/> ):(
            <Button title="Update" backgroundColor="blue" onPress={onUpdate}/>
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
