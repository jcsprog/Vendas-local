import * as React from 'react';
import { useState,useEffect } from 'react';
import { Alert, Pressable, Text, View, TextInput, FlatList, TouchableOpacity,Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalstyles } from '../estilos';
import { TextInputMask } from "react-native-masked-text";
import CurrencyInput from 'react-native-currency-input';

export default function Vendas({ navigation }) {

  const [apelido , setApelido] = useState('');
  const [descvenda , setDescvenda] = useState('');
  const [dtcomp , setDtcomp] = useState('');
  const [vlcompra , setVlcompra] = useState('0.00');  
  const [vapelido , setVapelido] = useState(null);
 
  const [situcli , setSitucli] = useState('I');

  const [nomecli , setNomecli] = useState('');
  const [endcli , setEndcli] = useState('');
  const [telcli , setTelcli] = useState('');  
  const [cidcli , setCidcli] = useState('');
 
  const adados=[{
    apelido,
    nomecli,
    endcli,
    telcli,
    cidcli
  }];

  const Avenda={
    vapelido,
    descvenda,
    dtcomp,
    vlcompra
  };

  // lista clientes
  const [listacli , setLista] = useState(adados);
  // lista compras cliente
  const [listacompra, setListacompra] = useState(Avenda);

   function limpaDados(){
    setApelido('');
    setDescvenda('');
    setDtcomp('');
    setVlcompra('');  
   };

   useEffect(() => {
    CriaLista();
  },[]);    

   function pegaCli(vcli){
    setApelido(vcli);
    setVapelido(vcli);
   };

   const removeItem = (id) => {
    let arr = listacompra.filter(function(item) {
      return item.descvenda !== id
    })
    setListacompra(arr);
  };

  // gera lista de clie
   async function CriaLista(){
      const resposta = await AsyncStorage.getItem('@Cliente');
      const dados = resposta ? JSON.parse(resposta):[];
      setLista(dados);
    };

      async function ValidaCli(){
        console.log(apelido);
        console.log(vlcompra);
        if(apelido == ' ' || vlcompra == 0){
          Alert.alert('Atenção!', 'Apelido ou Valor Não podem estar Vazio!');
          } else if(apelido != ' '){
    
            if(situcli == "I"){
              const resposta = await AsyncStorage.getItem(apelido+"C");
              const matriz = resposta ? JSON.parse(resposta):[];
              const dados = [...matriz,Avenda];
              await AsyncStorage.setItem(apelido+"C",JSON.stringify(dados));
              setListacompra(dados);
          
              Alert.alert('Compra!', 'Cadastrada com Exito ('+apelido+')!');

            }   
    
            limpaDados();
            setSitucli("I");  
         }
         }
  return (

      <View style={{ flex:1 }}>
 
      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
        <Text style={globalstyles.campo_b}>  Apelido  </Text> 
        <Text style={globalstyles.campo_b}>Clientes/Apelidos</Text>
        
      </View>
        <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
          <TextInput style={{ 
            backgroundColor: '#121212',
            borderRadius:10,
            fontSize: 18,
            color: '#fff',
            width: 180,
            height: 40
            }}
            value={apelido}
            onChangeText={(apelido) => setApelido(apelido)}
          />
           <Picker 
             selectedValue={vapelido}
             style={{ height: 15, width: 180, fontSize: 14, backgroundColor: '#41AEF4'}}
             onValueChange={(itemValue) => pegaCli(itemValue)}
             >
            <Picker.Item          
              label="Apelidos" value={null} />
              {listacli.map((item, index) => (
              <Picker.Item style={{fontSize: 14}} key={item.apelido} label={item.apelido+"-"+item.nomecli} value={item.apelido} />
              ))}
            </Picker>
        </View>   
        <Text style={globalstyles.campo_b}>Descrição da Compra</Text> 
        <TextInput style={globalstyles.campo_a}
          value={descvenda}
          onChangeText={(descvenda) => setDescvenda(descvenda)}
        />     

        <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
          <Text style={globalstyles.campo_b}>R $  Compra</Text> 
          <Text style={globalstyles.campo_b}>Data da Compra</Text> 
          </View>
          <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
           <CurrencyInput
           value={vlcompra}
           onChangeValue={setVlcompra}
           prefix="R$ "
           delimiter="."
           separator=","
           precision={2}
           style={{ 
            backgroundColor: '#121212',
            borderRadius:10,
            fontSize: 18,
            color: '#fff',
            width: 180,
            height: 40
            }}
           />
    
        <TextInputMask style={{ 
            backgroundColor: '#121212',
            borderRadius:10,
            fontSize: 18,
            color: '#fff',
            width: 150,
            height: 40
            }}
         type={'datetime'}
         options={{
         format: 'DD/MM/YYYY'
         }}
         value={dtcomp}
         onChangeText={text => setDtcomp(text)}
        />
      </View>
      
      <View style={{flexDirection: "row",justifyContent: "space-between"}} >
        <Pressable
          onPress={() => {ValidaCli()}}
          style={globalstyles.btn_chamada}>
        <Text style={{  textAlign: 'center',fontSize: 18}}>Confirma</Text>
        </Pressable>  
        
        <Pressable
          onPress={() => limpaDados()}
          style={globalstyles.btn_volta}>
        <Text style={{  textAlign: 'center',fontSize: 18}}>Cancela</Text>
      </Pressable>  

        <Pressable
          onPress={() => navigation.goBack()}
          style={globalstyles.btn_chamada}>
        <Text style={{  textAlign: 'center',fontSize: 18}}>Retorna</Text>
        </Pressable>  
      </View>

      <Text  style={{ fontSize: 24}}>Pedido</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={globalstyles.campo_b}
          horizontal={false}
          data={listacompra}
          keyExtractor={(item) => item.descvenda}
          renderItem={({ item }) => {
          return (
          <TouchableOpacity
            onPress={() => removeItem(item.descvenda)}
          >
          <Text>{item.descvenda+'-'+item.vlcompra}</Text>
          </TouchableOpacity>  
          );
        }}
      />

    </View>
  );
}
