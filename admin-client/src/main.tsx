import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'
import { AdminTable } from './views/AdminTable'

render(
  <React.StrictMode>
    <AdminTable
      rows={[
        { a: 1, b: "asd", c: new Date().toISOString() },
        { a: 1, b: "asdaaa", c: new Date().toISOString() },
        { a: 8, b: "asdasd", c: new Date().toISOString() },
        { a: 1, b: "asd", c: new Date().toISOString() },
        { a: 188, b: "asdaaa", c: new Date().toISOString() },
        { a: 10, b: "asd", c: new Date().toISOString() },
      ]}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
