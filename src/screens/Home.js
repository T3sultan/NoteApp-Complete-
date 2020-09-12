import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity,FlatList} from 'react-native'
import Button from '../components/Button';
import {firebase} from '../firebase/config';
import { AntDesign } from '@expo/vector-icons'; 
import Cards from '../components/Cards';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
    wrapper:{
       
        flex:1,
        margin:20,
    },
    tittleWrapper:{
        
        flexDirection:"row",
        alignItems:"center",  
        justifyContent:"space-between",
        
       
    },
    tittle:{
       
        fontSize:20,
        fontWeight:"bold",
     
        padding:10
       

    }
});
export default function Home({navigation,extraData}) {
    const [notes, setNotes] =useState(null);
    const userId=extraData.uid;
    const noteRef=firebase.firestore().collection("notes");
    // console.log("Notes",notes);


    useEffect(()=>{
        //on snapshot is our subscribtion
        const subscriber = noteRef
        // .orderBy("createdAt","desc")
        // .where("authorId","==",userId)
        .onSnapshot((querySnapshot)=>{
            const newNotes=[];  //create this array to set our main notes
            querySnapshot.forEach((doc)=>{
                //creating note object
                const note=doc.data();
                note.id=doc.id;
                newNotes.push(note);

            });
            //setting it here...
            setNotes(newNotes);

        });
        return subscriber;

    },[]);
    const onDelete=(id)=>{
     return noteRef.doc(id).delete();

    }
    
    const renderNote=({item,index})=>{
        return (
            <Cards customstyle={{padding:35 ,marginButtom:20,marginRight:0}}>
                <View style={[styles.tittleWrapper,{flex:1}]}>
                 <View style={{flexDirection:"row",flex:1,flexWrap:"wrap"}}>
                 <Text>{`Note #${index +1 } -`}</Text>
                 <Text>{item.description}</Text>

                 </View>
                 <View style={{flexDirection:"row"}}>

                 <TouchableOpacity onPress={()=>navigation.navigate("Update",{item})}>
                 <Feather name="edit-2" size={24} color="black" />

                 </TouchableOpacity>
                 <TouchableOpacity onPress={()=>onDelete(item.id)}>
                 <AntDesign name="delete" size={24} style={{marginLeft:5}} color="black" />

                 </TouchableOpacity>
               
                 

                 </View>
                

                </View>
            </Cards>
        );
    }

    

    if(!notes || (notes && notes.length === 0 )){ 
        // return (
        //     <View style={{flex:1 ,backgroundColor: "white"}}>


        //    <View style={styles.wrapper}>
        //      <View style={styles.tittleWrapper}>
        //         <Text style={styles.tittle}>My TODOs</Text>
        //         <TouchableOpacity 
        //         onPress={()=>navigation.navigate("Create",{userId})}>
        //         <AntDesign name="pluscircleo" size={24} color="black" />

        //         </TouchableOpacity>
                

        //      </View>

        //      <View>
        //          <Image style={{height:300,width:"100%",marginTop:100}} 
        //          resizeMode="contain" 
        //          source={require('../../assets/empty.png')}/>
        //          <Text style={{textAlign:"center",paddingTop:20,fontSize:18}}>
        //          No notes, Please add new notes</Text>

        //          </View>
             

        //          <View style={{flex:1,justifyContent:"flex-end"}}>
        //          <Button title="Logout" backgroundColor="#ffd700" onPress={()=>{
        //         firebase.auth().signOut();

        //     }}/>

        //          </View>

                 

        //    </View>

        //     </View>
        // )
    }
    return (
        <View  style={{flex:1,backgroundColor:"white"}}>
           <View style={styles.wrapper}>
             <View style={styles.tittleWrapper}>
                <Text style={styles.tittle}>My Notes</Text>
                <TouchableOpacity
                 onPress={()=>navigation.navigate("Create",{userId})}>
                <AntDesign name="pluscircleo" size={24} color="black" />

                </TouchableOpacity>
        

               
                

             </View>

             <FlatList style={{marginTop:50,color:"red"}} data={notes} 
                renderItem={renderNote}
                 keyExtractor={(item,index)=>index.toString()}
                     containContainerStyle={{paddingVertical:20}}
                 />
             
                 <View style={{flex:1,justifyContent:"flex-end"}}>
                 <Button title="Logout" backgroundColor="blue" onPress={()=>{
                firebase.auth().signOut();

            }}

            />

                 </View>

                 

           </View>
           
        </View>
    );
}

