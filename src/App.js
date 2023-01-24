import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'
import './App.css';

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert("Напиши что небуть...")
      setItem('')
    }
  }



  const deleteNow = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePus = (data, index) => {
    let newAray = [...items]
    newAray[index].defaultPos = { x: data.x, y: data.y }
    setItems(newAray)
  }

  const keyPress = (e) => {
    const code = e.keyCode || e.which
    if (code === 13) {
      newItem()
    }
  }

  return (
    <div className="App">
      <div className='wraper'>
        <input
          value={item}
          type="text"
          placeholder='Напиши что небуть...'
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button
          className='enter'
          onClick={newItem}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
