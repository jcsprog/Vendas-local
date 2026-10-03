import * as React from 'react';
import { useState,useEffect } from 'react';
import { Alert, Pressable, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalstyles } from '../estilos';

export default function Empresa({ navigation }) {

  const [codemp,setCodemp] = useState("@dados:001");
  const [nomemp , setNomemp] = useState('');
  const [endemp , setEndemp] = useState('');
  const [telemp , setTelemp] = useState('');  
  const [cepemp , setCepemp] = useState('');  
  const [cidemp, setCidemp] = useState('');
  const [ufemp, setUfemp] = useState('');
  const [numerordem, setNumerordem] = useState("");
  const [ncli, setNcli] = useState("1");
   
  const Aempresa={
    codemp,
    nomemp,
    endemp,  
    telemp,
    cepemp,
    cidemp,
    ufemp,
    numerordem,
    ncli,
  }
 
  useEffect(() => {
    VerificaEmp();
  },[]);    

   async function VerificaEmp(){
        
    const mchave = await AsyncStorage.getItem("@dados:001");
    const matriz = mchave ? JSON.parse(mchave):"";
    
    if (matriz.length != 0){

       setCodemp(matriz.codemp);
       setNomemp(matriz.nomemp);
       setEndemp(matriz.endemp);
       setTelemp(matriz.telemp);
       setCepemp(matriz.cepemp);
       setCidemp(matriz.cidemp);
       setUfemp(matriz.ufemp);
       setNumerordem(matriz.numerordem);
       setNcli(matriz.ncli);
    }
  }

  async function ValidaEmpresa(){
    if(nomemp == ''){
      Alert.alert('Atenção!', 'Nome da Empresa Não pode estar Vazio!');
      } else if(nomemp != ' '){

         const resposta = await AsyncStorage.getItem(codemp);
         await AsyncStorage.setItem(codemp,JSON.stringify(Aempresa));

         Alert.alert('Show!', 'Cadastro Empresa ('+nomemp+') realizado com Sucesso!');

         setCodemp(matriz.codemp);
         setNomemp(matriz.nomemp);
         setEndemp(matriz.endemp);
         setTelemp(matriz.telemp);
         setCepemp(matriz.cepemp);
         setCidemp(matriz.cidemp);
         setUfemp(matriz.ufemp);
         setNumerordem(matriz.numerordem);
         setNcli(matriz.ncli);

         setCodemp('');
         setNomemp('');
         setEndemp('');
         setTelemp('');
         setCepemp('');
         setCidemp('');
         setUfemp('');
         setNumerordem('');
         setNcli('');
     }
     }
  
  return (
    <View style={{ flex: 1}}>
        <Text style={globalstyles.txt_ver}> Codigo da Empresa : 001 </Text>

        <Text style={globalstyles.campo_b}>Empresa </Text> 
        <TextInput style={globalstyles.campo_a}
          value={nomemp}
          onChangeText={(nomemp) => setNomemp(nomemp)}
        />  

        <Text style={globalstyles.campo_b}>Endereço </Text> 
        <TextInput style={globalstyles.campo_a}
          value={endemp}
          onChangeText={(endemp) => setEndemp(endemp)}
        />     

      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
        <Text style={globalstyles.campo_b}>Telefone/Celular</Text> 
        <Text style={globalstyles.campo_b}>C.e.p.               </Text> 
        <Text style={globalstyles.campo_b}>UF</Text> 

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
          value={telemp}
          onChangeText={(telemp) => setTelemp(telemp)}
        />               


        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 125,
          height: 40, 
          }}
          value={cepemp}
          onChangeText={(cepemp) => setCepemp(cepemp)}
        />    

        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 40,
          height: 40, 
          }}
          value={ufemp}
          onChangeText={(ufemp) => setUfemp(ufemp)}
        />                          
      </View>

      <View style={{flexDirection: "row"}} >
        <Text style={globalstyles.campo_b}>Cidade</Text> 
        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 145,
          height: 40, 
          margin: 5,
          }}
          value={cidemp}
          onChangeText={(cidemp) => setCidemp(cidemp)}
        />              

        <Text style={globalstyles.campo_b}>Cupom</Text> 
        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 40,
          height: 40, 
          margin: 5
          }}
          value={numerordem}
          onChangeText={(numerordem) => setNumerordem(numerordem)}
          keyboardType="numeric"
        />               
      </View>

      <View style={{flexDirection: "row",justifyContent: "space-between"}} >
        <Pressable
          onPress={() => {ValidaEmpresa()}}
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
