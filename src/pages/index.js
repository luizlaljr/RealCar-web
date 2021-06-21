import React, { useState } from 'react';

import api from '../services/api/api'

export async function getStaticProps() {
  const { data: items } = await api.get('item')

  return {
    props: {items},
  }
}

function Index(props) {
  const [list, setList] = useState(props.items)
  const [input, setInput] = useState('')

  const handleList = (e) => {
    setInput(e.target.value)
    const fetchInput = e.target.value.toUpperCase()
    const newList = []
    const listFetch = fetchInput.split(' ')
    for (let i = 0; i < props.items.length; i++) {
      const item = props.items[i];
      let count = 0
      for (let j = 0; j < listFetch.length; j++) {
        const fetch = listFetch[j]; 
        if(item.name.indexOf(fetch) !== -1){
          count++;
        }
        if(count === listFetch.length){
          newList.push(item)
        }
      }
    }
    console.log(newList)
    setList(newList)
  }

  const clearInput = () => {
    setInput('')
    setList(props.items)
  }

  return <div>
    <h1>RealCar</h1>
    <h3>Estoque na Nuvem</h3>
    <div>
    <input id="fetch" name="fetch"
    placeholder="Digite o produto"
    value={input}
    onChange={handleList}
    type="text" />
    <button onClick={clearInput} style={{'marginLeft': '10px'}}>Limpar</button>
    </div>

    <div>
      {list.map(
        (item)=>(
          <div key={item.id} style={{'margin': '15px 0',
          'paddingBottom': '15px', 'borderBottom': '1px solid #ccc'}}>
          <div>codigo: <span>{item.code}</span></div>
          <div>nome: <span>{item.name}</span></div>
          <div>preço: R$ <strong>{(item.value/100).toFixed(2)}</strong></div>
          </div>
        )
      )}
      
    </div>
  </div>;
}

export default Index;
