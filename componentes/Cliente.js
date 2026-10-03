import * as React from 'react';
import { useState, useEffect } from 'react';
import { Alert, Pressable, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalstyles } from '../estilos';

export default function Cliente({ navigation }) {

  const [apelido , setApelido] = useState('');
  const [nomecli , setNomecli] = useState('');
  const [endcli , setEndcli] = useState('');
  const [telcli , setTelcli] = useState('');  
  const [cidcli , setCidcli] = useState('');
  //const [selectedItem , setAtem] = useState();
  const [situcli , setSitucli] = useState('I');
  const [selectlista, setSelectedItem] = useState(null);
  
  const adados=[{
    apelido,
    nomecli,
    endcli,
    telcli,
    cidcli,
  }];

  const Acli={
    apelido,
    nomecli,
    endcli,
    telcli,
    cidcli,
  };

   function limpaDados(){
    setNomecli('');
    setEndcli('');
    setTelcli('');
    setCidcli('');
    setApelido('');
   };

  useEffect(() => {
     CriaLista();
  }, [apelido]); // Roda sempre que 'contador' for atualizado

  // gera lista de clie
   async function CriaLista(){
      const resposta = await AsyncStorage.getItem('@Cliente');
      const dados = resposta ? JSON.parse(resposta):[];
      setLista(dados);
    };
  
    // ver aleracao
    function Verifialteracao(){
       Alert.alert("Atenção" ,"Ao final da Alteração de Cadastro. Click em Confirma!!");
      setSitucli("A");
    };
    
    async function removecli(vcli){
     let arr = listacli.filter(function(item) {
     return item.apelido !== vcli
     })
     setLista(arr);
    
      await AsyncStorage.removeItem("@Cliente");
      await AsyncStorage.setItem("@Cliente",JSON.stringify(arr));
      Alert.alert("Exclusão !","Realizada com Exito.")
      setSitucli("I");    
      limpaDados();
      };

    const [listacli , setLista] = useState(adados);
    
    function verCli(vcli){

        const resposta = listacli.find(listacli => listacli.apelido === vcli);
        const _posicao = resposta ? resposta :" ";
 
        if (_posicao != " "){
           setApelido(_posicao.apelido);
           setNomecli(_posicao.nomecli);
           setEndcli(_posicao.endcli);
           setTelcli(_posicao.telcli);
           setCidcli(_posicao.cidcli);

           Alert.alert(
            'Informações Cadastradas','Apelido:'+_posicao.apelido+'\n'+'Nome:'+_posicao.nomecli+
            '\n'+'End.:'+_posicao.endcli+'\n'+'Tel.:'+_posicao.telcli+'\n'+'Cidade:'+_posicao.cidcli+'\n'+' '+'\n'+' Veja as Opções ?',
            [
              { text: 'Alterar', onPress: () => Verifialteracao()},
              { text: 'Excluir', onPress: () => removecli(vcli)},
              { text: 'Cancela', onPress: () =>  limpaDados()},
            ],
           );
        };
      };

      async function ValidaCli(){
        if(apelido == ''){
          Alert.alert('Atenção!', 'Apelido Não pode estar Vazio!');
          } else if(apelido != ' '){
    
            if(situcli == "I"){
              const resposta = await AsyncStorage.getItem("@Cliente");
              const listaCli = resposta != null ? JSON.parse(resposta) : [];

              const clienteEncontrado = listaCli.find(listaCli => listaCli.apelido === apelido);
 
              if( clienteEncontrado ==null){
                const matriz = resposta ? JSON.parse(resposta):[];
                const dados = [...matriz,Acli];
                await AsyncStorage.setItem("@Cliente",JSON.stringify(dados));
                setLista(dados);
                Alert.alert('Inclusão!', 'Realizada com Exito ('+apelido+')!');
                limpaDados();
              }else {
               Alert.alert("Atenção" ,"Apelido já cadastrado. Modifique");
              }
            } else if(situcli == "A"){
    
              let arr = listacli.filter(function(item) {
                return item.apelido !== apelido
              })
              setLista(arr);
    
              await AsyncStorage.removeItem("@Cliente");
              //const matriz = resposta ? JSON.parse(resposta):[];
              const dados = [...arr,Acli];
              await AsyncStorage.setItem("@Cliente",JSON.stringify(dados));
          
              Alert.alert('Alteração!', 'Realizada Com Exito ('+apelido+')!');
              {CriaLista()};
              limpaDados();
            }   
            setSitucli("I");  
         }
         }
  return (

      <View style={{ flex:1 }}>
 
      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
        <Text style={globalstyles.campo_b}>  Apelido  </Text> 
        
        <Pressable 
          onPress={() => {CriaLista()}}
          style={globalstyles.campo_b}>
         <Text style={{  textAlign: 'center',fontSize: 18}}>  Consulta  </Text>
         </Pressable>
      </View>
        <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
          <TextInput style={{ 
            backgroundColor: '#121212',
            borderRadius:10,
            fontSize: 18,
            color: '#fff',
            width: 180,
            height: 40,
            }}
            value={apelido}
            onChangeText={(apelido) => setApelido(apelido)}
           />
          
           <Picker 
             setSelectedItem={selectlista}
             style={{ height: 35, width: 180, fontSize: 14, backgroundColor: '#41AEF4'}}
              onValueChange={(itemValue) => verCli(itemValue)}
             >
            <Picker.Item          
              label="Apelidos" value={null} />
              {listacli.map((item, index) => (
              <Picker.Item style={{fontSize: 14}} key={item.apelido} label={item.apelido+"-"+item.nomecli} value={item.apelido} />
              ))}
            </Picker>
        </View>   
        <Text style={globalstyles.campo_b}>Nome</Text> 
        <TextInput style={globalstyles.campo_a}
          value={nomecli}
          onChangeText={(nomecli) => setNomecli(nomecli)}
        />     

        <Text style={globalstyles.campo_b}>Endereço</Text> 
        <TextInput style={globalstyles.campo_a}
          value={endcli}
          onChangeText={(endcli) => setEndcli(endcli)}
        />       

      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
        <Text style={globalstyles.campo_b}>Telefone/Celular</Text> 
        <Text style={globalstyles.campo_b}>     Cidade      </Text> 
      </View>  

      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 165,
          height: 40,
          }}
          value={telcli}
          onChangeText={(telcli) => setTelcli(telcli)}
        />               

        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 125,
          height: 40, 
          }}
          value={cidcli}
          onChangeText={(cidcli) => setCidcli(cidcli)}
        />    
      </View>

      <View style={{flexDirection: "row",justifyContent: "space-between"}} >
        <Pressable
          onPress={() => {ValidaCli()}}
          style={globalstyles.btn_chamada}>
        <Text style={{  textAlign: 'center',fontSize: 18}}>Confirma</Text>
        </Pressable>  
        
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalstyles.btn_volta}>
        <Text style={{  textAlign: 'center',fontSize: 18}}>Retorna</Text>
      </Pressable>  
      </View>

    </View>
  );
}
