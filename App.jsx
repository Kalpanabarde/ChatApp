import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";


export default function App() {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://10.76.184.237:8082");

    socket.onopen = () => console.log("✅ Connected to server");

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, `Friend: ${event.data}`]);
    };

    socket.onclose = () => console.log("❌ Connection closed");

    setWs(socket);

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      ws.send(message);
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
   
      <FlatList
        data={messages}
        renderItem={({ item }) =>{
          const isSentByYou =item.startsWith('You')
          return (

            <Text style={isSentByYou?styles.textStyle: styles.ReceiverStyle}>{item}</Text>)}}
        keyExtractor={(_, index) => index.toString()
        } 
        
      
      />
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Type a message" placeholderTextColor="#9f9b9bff" 
        value={message}
        onChangeText={setMessage} multiline
        style={{flex:1,  borderWidth: 1,
          borderColor: "#ccc", padding: 15, marginVertical: 10, borderRadius:30
        , backgroundColor:'#fff' }}
      />
      <TouchableOpacity onPress={sendMessage} style={styles.button}>
      <Text style={{color:'#ffff'}}>send</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles= StyleSheet.create({

container:{
flex:1,
paddingHorizontal:5,
paddingTop:7,

justifyContent:'flex-end',
backgroundColor:'#056e69ff'

},

inputContainer:{
marginLeft:7,  
flexDirection:'row',
justifyContent:'flex-end',

},

button:{
alignItems:'center',
borderWidth:1,
borderColor:'#66459eff',
borderRadius:15,  
padding:18,
margin:10,
backgroundColor:'#66459eff'
}
,

textStyle:{

alignSelf:'flex-end', paddingHorizontal:18, paddingVertical:10, fontSize:15, margin:5, borderWidth:1, borderRadius:10,  borderColor:'#f9f7c1ff',
           backgroundColor:'#f9f7c1ff' 
},

ReceiverStyle:{

alignSelf:'flex-start', paddingHorizontal:18, paddingVertical:10, fontSize:15, margin:5, borderWidth:1, borderRadius:10,  borderColor:'#bddaecff',
           backgroundColor:'#bddaecff' 
},


})