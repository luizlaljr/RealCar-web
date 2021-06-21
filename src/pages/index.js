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
    const newList = props.items.filter(item => item.name.includes(`${e.target.value.toUpperCase()}`))
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
