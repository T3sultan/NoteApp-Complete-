import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Cards({children,customstyle}) {
    return (
        <View style={[styles.wapper,customstyle]}>
         {children}          
        </View>
    )
}

const styles = StyleSheet.create({
    wapper:{
        borderRadius:12,
        backgroundColor:"white",
        elevation:2,
        borderWidth:1,
    }
})
