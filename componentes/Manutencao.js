// lista permissões flatlist
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FlatList,Pressable, Text, View,
   TouchableOpacity, Modal,
   Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalstyles } from '../estilos';

const Separator = () => <View style={globalstyles.separator} />;
export default function Manutencao({ navigation }) {

    const [listaPermissao,setLis] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [apelido , setApelido] = useState('');
    const [nomecli , setNomecli] = useState('');
    const [endcli , setEndcli] = useState('');
    const [telcli , setTelcli] = useState('');  
    const [cidcli , setCidcli] = useState('');

    const adata={
      apelido,
      nomecli,
      endcli,
      telcli,
      cidcli
     }
  
    const [data, setData] = useState(adata);
    
    async function criadados(){ 
      const mchave = await AsyncStorage.getItem('@Cliente');
      const listaPermissao = mchave ? JSON.parse(mchave):"";
      if (listaPermissao.length == 0){
         Alert.alert('Informação', 'Necessário Realizar o Cadastro de Clientes!');
         {navigation.goBack()}
       }
        setData(listaPermissao);
      } 
         
    useEffect(() => {
      criadados();
    },[]);    
  
        
     function mostraList(t_id) {
        const _posicao = data.find(data => data.apelido === t_id);
  
        setApelido(_posicao.apelido);
        setNomecli(_posicao.nomecli);
        setEndcli(_posicao.endcli);
        setTelcli(_posicao.telcli);
        setCidcli(_posicao.cidcli);
        setModalVisible(true);
   
      }   
  
    return (
      <View style={{flex: 1,justifyContent: "center",paddingTop: 5,
         backgroundColor: "#ecf0f1",padding: 5}}>
      <View>
        <Text style={{ fontSize: 20}}> Apelido       Nome do Cliente</Text>
      </View>
       <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal:5,paddingVertical:5      
          }}
          horizontal={false}
          data={data}
          keyExtractor={(item) => item.apelido.toString()}
          renderItem={({ item }) => {
          return (
         <TouchableOpacity
           onPress={() => mostraList(item.apelido) }
           >
          <View style={{flexDirection: "row"}} > 
         
           <Text style={{ fontSize: 18, width: 100,color:'blue'}}>{item.apelido}</Text>
           <Text style={{ fontSize: 18, width: 200}}>{item.nomecli}</Text>
        
          </View>
         </TouchableOpacity>  
          );
          }}
          />
             <Modal
             animationType="slide"
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => {
             setModalVisible(!modalVisible);
             }}>
             <View style={globalstyles.centeredView}>
               <View style={globalstyles.modalView}>
                <Text style={globalstyles.modalText}>{apelido}</Text>
                <Pressable
                style={[globalstyles.button,globalstyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={globalstyles.textStyle}>{nomecli}</Text>
                <Text style={globalstyles.textStyle}>{endcli}</Text>
                <Text style={globalstyles.textStyle}>{telcli}</Text>
                <Text style={globalstyles.textStyle}>{cidcli}</Text>
                </Pressable>
               </View>
             </View>
           </Modal>
           <Text style={globalstyles.txt_ver}> Click para Consulta</Text>
        </View>
    );
    }
    