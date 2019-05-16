import React from 'react'
import Article from './Article'
import data from '../Data'

function App() {
  return (
    <div className='container'>
      <h1>Toptitle</h1>
      <Article article={data[0]} foo='bar'/>
    </div>
  )
}

export default App
