import {StyleSheet} from 'react-native';

export const globalstyles = StyleSheet.create({
    mView : {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff',
     },
     btn_chamada:{
        padding: 10,
        fontSize: 20,
        backgroundColor: '#41AEF4',
        borderRadius:30,
        marginBottom: 10,
        marginTop: 10,
      },
      btn_volta:{
        padding: 10,
        fontSize: 20,
        backgroundColor: '#ff0000',
        borderRadius:30,
        marginBottom: 10,
        marginTop: 10,
      },
    Container:{
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 22,
      },
    modalView: {
      margin: 20,
      backgroundColor: '#f3f6f4',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      fontSize: 25,
      marginBottom: 15,
      textAlign: 'center',
    },
    imageBackground: {
      justifyContent: 'center',
      width: 300,
      height: 300,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
     txt_ver:{
        fontSize: 20,
     },  
     separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    campo_a :{ 
      backgroundColor: '#121212',
      borderRadius:15,
      fontSize: 18,
      color: '#fff',
      margin: 2,
      padding: 2
       },
      campo_b :{ 
        backgroundColor: '#41AEF4',
        borderRadius:15,
        fontSize: 20,
        color: '#fff',
        textAlign: 'left',
        margin: 5,
        padding: 2
       },    
  });
