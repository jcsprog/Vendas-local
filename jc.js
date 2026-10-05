const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
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