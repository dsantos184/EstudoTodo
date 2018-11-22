/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput,
  Button,
} from 'react-native';

import ItemList from './src/component/ItemList';

export default class App extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      lista: [],
      input: '',
    }
    //https://b7web.com.br/todo/88640/info

    this.url = 'https://b7web.com.br/todo/88640'

    this.addText = this.addText.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.loadList = this.loadList.bind(this);

    this.loadList();
  }

  loadList()
  {
    fetch(this.url)
    .then((r)=>r.json())
    .then((response)=>{
      let s = this.state;
      s.lista = response.todo;
      this.setState(s);
    })
  }

  addText(value)
  {
    let s = this.state;
    s.input = value;
    this.setState(s);
  }

  addTodo()
  {
    let text = this.state.input;
    let s = this.state;
    s.input = '';
    this.setState(s);

    fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        item: text
      })
    })
    .then((r)=>r.json())
    .then((response)=>{
      this.loadList()
    })
    
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.containerAdd}>

          <Text style={styles.textAdd}>Adicione uma nova tarefa</Text>

          <TextInput
            style={styles.inputAdd}
            onChangeText={value=>this.addText(value)}
            value={this.state.input}
          />

          <Button title='Adicionar' onPress={()=>this.addTodo()} />

        </View>

        <FlatList
          data={this.state.lista}
          renderItem={({item})=><ItemList data={item} url={this.url}  loadLista={this.loadList}/>}
          keyExtractor={(item, index)=>item.id}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
  },

  containerAdd:
  {
    marginBottom: 20,
    backgroundColor: '#DDD',
  },

  inputAdd:
  {
    height: 40,
    backgroundColor: '#CCC',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  textAdd:
  {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});