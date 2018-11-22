import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class ItemList extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            done: (props.data.done == '0')?styles.undone: styles.done ,
            feito: props.data.done,
        };

        this.marcar = this.marcar.bind(this)
        this.excluir = this.excluir.bind(this);
    }

    marcar()
    {               
        let s = this.state;
        let done = '';

        if( s.done == styles.undone )
        {
            done = 'sim';
            s.done = styles.done;
        }
        else
        {
            done = 'nao';
            s.done = styles.undone;
        }

       this.setState(s);

        fetch(`${this.props.url}/${this.props.data.id}`,{
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                done: done
            })
        })
        .then(r=>r.json())
        .then(response=>{
          
        })
    }

    excluir()
    {
        fetch(`${this.props.url}/${this.props.data.id}`,{
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(r=>r.json())
        .then(response=>{
          alert('Item excluído com sucesso!');
          this.props.loadLista();
        })
    }

    render()
    {
        return(
            <View style={styles.containerList}>

                <View style={styles.containerLeft}>
                
                    <TouchableHighlight onPress={()=>this.marcar()} style={[styles.marcar, this.state.done]}>
                        <View>
                            
                        </View>
                    </TouchableHighlight>

                    <Text>{this.props.data.item}</Text>
                
                </View>
               
                <View style={styles.containerRight} >

                    <TouchableOpacity onPress={()=>this.excluir()}>
                        <Image source={require('../../assets/img/icon-del.png')} style={styles.iconDel} />
                    </TouchableOpacity>
                    
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerList:
    {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    marcar:{
        width: 40,
        height: 40,
        marginRight: 10,
    },

    undone:
    {
        backgroundColor: '#CCCCCC',
    },

    done:
    {
        backgroundColor: '#00FF00',
    },

    containerLeft:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignItems: 'center',
    },

    containerRight:
    {
        flex: 1,
        alignItems: 'flex-end'
    }
});