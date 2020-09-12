import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'


export default function Button({icon,title,backgroundColor,onPress}) {
    return (
       <TouchableOpacity onPress={onPress} 
       style={[ styles.container ,{ backgroundColor }]}>
       <Image source={icon}/>
       <Text style={styles.btnText}>{title}</Text>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        height:50,
        flexDirection:"row",
        alignItems:"center",
        
        borderRadius:50,
        paddingHorizontal:25,
        justifyContent:'center',
        marginTop:40

    },
    btnText:{
        fontSize:16,
        fontWeight:"500",
        
        color:"white",
        // marginLeft:8,
    }
})
