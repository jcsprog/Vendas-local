import * as React from 'react';
import { View, Text,Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { globalstyles } from './componentes/estilos';
import Empresa from './componentes/Empresa';
import Cliente from './componentes/Cliente';
import Manutencao from './componentes/Manutencao';
import Vendas from './componentes/Vendas';

const Separator = () => <View style={globalstyles.separator} />;

function HomeScreen({ navigation }) {
  return (
    <View style={{  flex: 1 }}>
      <View>
        <Text  style={{ fontSize: 12,textAlign: 'right'}}>JcSoft</Text>
      </View>
      <View style={globalstyles.mView}>

         <Pressable
          onPress={() => navigation.navigate('Cadastro')}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Cadastros</Text>
        </Pressable>  

      <Separator/>

         <Pressable
          onPress={() => navigation.navigate('Vendas Parceladas')}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Vendas Parceladas</Text>
        </Pressable>  

    </View>
    </View>
  );
}

function Cadastros({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
     <View>
        <Text style={{ fontSize: 10,textAlign: 'right'}}>JcSoft</Text>
      </View>
      <View style={globalstyles.mView}>

        <Pressable
          onPress={() => navigation.push("Cadastro da Empresa")}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Empresa</Text>
        </Pressable>  

        <Pressable
          onPress={() => navigation.navigate('Cadastro de Cliente')}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Clientes</Text>
        </Pressable>  

        <Pressable
          onPress={() => navigation.push("Manutenção de Clientes")}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Manutenção de Clientes</Text>
        </Pressable>  

        <Pressable
          onPress={() =>  navigation.popToTop()}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Tela Principal</Text>
        </Pressable>  

      </View>
    </View>
  );
}

function VendaParceladas({ navigation }) {
  return (
    <View style={{ flex: 1}}>
       <View>
        <Text  style={{ fontSize: 12,textAlign: 'right'}}>JcSoft</Text>
      </View>
      <View style={globalstyles.mView}>

        <Pressable
          onPress={() => navigation.navigate("Vendas Lançamentos")}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Vendas</Text>
        </Pressable>  

        <Pressable
          onPress={() => navigation.navigate('Details')}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Consulta Vendas</Text>
        </Pressable>  

        <Pressable
          onPress={() => navigation.navigate('Details')}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Consulta Pagamentos</Text>
        </Pressable>  

       <Pressable
          onPress={() => navigation.goBack()}
          style={globalstyles.btn_chamada}>
          <Text style={globalstyles.txt_ver}>Volta</Text>
        </Pressable>   

    </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Vendas">
        <Stack.Screen name="Vendas" component={HomeScreen} />
        <Stack.Screen name="Cadastro" component={Cadastros} />
        <Stack.Screen name="Cadastro da Empresa" component={Empresa} />
        <Stack.Screen name="Cadastro de Cliente" component={Cliente} />
        <Stack.Screen name="Manutenção de Clientes" component={Manutencao} />
        <Stack.Screen name="Vendas Parceladas" component={VendaParceladas} />
        <Stack.Screen name="Vendas Lançamentos" component={Vendas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
