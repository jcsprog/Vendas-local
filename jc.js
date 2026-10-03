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
        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 165,
          height: 30
          }}
          value={telemp}
          onChangeText={(telemp) => setTelemp(telemp)}
        />               
