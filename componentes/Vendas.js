import * as React from 'react';
import { useState,useEffect } from 'react';
import { Alert, Pressable, Text, View, TextInput, FlatList, TouchableOpacity,Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalstyles } from '../estilos';
import CurrencyInput from 'react-native-currency-input';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Vendas({ navigation }) {

  const [apelido , setApelido] = useState('');
  const [descvenda , setDescvenda] = useState('');
  const [dtcomp , setDtcomp] = useState(new Date());
  const [vlcompra , setVlcompra] = useState('0.00');  
  
  const [vapelido , setVapelido] = useState(null);
  const [status, setStatus] = useState('Aguardando digitação...');
  // Estado para controlar a visibilidade do seletor
  const [show, setShow] = useState(false); // para a data
 
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
    //setApelido('');
    setDescvenda('');
    setDtcomp(new Date());
    setVlcompra('');  
   };

   useEffect(() => {
    CriaLista();
  },[]);    

   function pegaCli(vcli){
   if(listacompra.vapelido != apelido){
      setListacompra([]);
     };
    setApelido(vcli);
    setVapelido(vcli);
   };

   const removeItem = (descvenda) => {
    let arr = listacompra.filter(function(item) {
      return item.descvenda !== descvenda
    })
    setListacompra(arr);
  };

  // Função chamada quando o usuário altera ou confirma a data
  const onChange = (event: any, setDtcomp?: Date) => {
    const currentDate = setDtcomp || date;
    setShow(false); // Fecha o seletor no Android/iOS
    setDtcomp(currentDate); // Salva a nova data no estado
  };

  // Função para definir explicitamente a data atual (botão rápido)
  const setToday = () => {
    setDtcomp(new Date());
  };

  // gera lista de clie
   async function CriaLista(){
      const resposta = await AsyncStorage.getItem('@Cliente');
      const dados = resposta ? JSON.parse(resposta):[];
      setLista(dados);
   };

// useEffect que funciona como o nosso "Debounce"
  useEffect(() => {
    // Se o campo estiver vazio, resgata o status inicial
    if (apelido.length === 0) {
      setStatus('Aguardando digitação...');
      return;
    }

    // Define um timer para rodar a validação após 600ms de inatividade
    const delayDebounceFn = setTimeout(() => {
      validarTexto(apelido);
    }, 600);

    // Limpa o timer caso o usuário digite outra letra antes dos 600ms passarem
    return () => clearTimeout(delayDebounceFn);
  }, [apelido]);

  // Função que será executada APÓS o preenchimento
async function validarTexto(textoParaValidar) {
       listacompra.map((item,index))
       if(item.vapelido != apelido){
         setListacompra([]);
       };
       setApelido(apelido);
  };

     // Formata o número para o padrão de moeda Real (BRL)
    async function formatarDinheiro(valor) {
      const numero = Number(valor) || 0;
      return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      });
    }

      async function ValidaCli(){
       
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
        <Text style={globalstyles.campo_b}>  Apelido </Text> 
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
            onChangeText={setApelido}
            value={apelido}
            //value={apelido}
            //onChangeText={(apelido) => setApelido(apelido)}
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
          <Text style={globalstyles.campo_b} > R$  C o m p r a </Text> 

           <Pressable
            onPress={() => {setShow(true)}}
            style={globalstyles.campo_b}>
            <Text style={{  textAlign: 'center',fontSize: 18}}>Seleciona Data</Text>
           </Pressable>  

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

           <Pressable
            onPress={setToday}
            style={globalstyles.campo_a}>
            <Text 
            style={{ 
            backgroundColor: '#121212',
            borderRadius:10,
            fontSize: 18,
            color: '#ffffff',
            width: 130,
            height: 30,
            }}>    Data Atual</Text>
           </Pressable>  

          {show && (
            <DateTimePicker
               value={dtcomp}
               mode="date"
               display="default"
               onChange={onChange}
            />
          )}
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

      <Text 
        style={{ 
        backgroundColor: '#121212',
        borderRadius:10,
        fontSize: 24,
        color: '#ffffff',
        width: 380,
        height: 38}}>
        Pedidos
      </Text>
    
      <Text style={globalstyles.campo_b}> Descrição do Compra          | R$ Compra </Text>
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
            <View style={{flexDirection: "row",justifyContent: "space-between"}}>
            <Text style={{ fontSize: 20, lineHeight: 24}}>{item.descvenda}</Text>
            <Text style={{ fontSize: 20, lineHeight: 24}}>{formatarDinheiro(item.vlcompra)}</Text>
            </View>
            </TouchableOpacity> 
             );
           
          }}
        />
    </View>
  );
}
