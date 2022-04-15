import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'
import { AdminTableContainer } from './views/AdminTable'

render(
  <React.StrictMode>
    <AdminTableContainer />
  </React.StrictMode>,
  document.getElementById('root')
)
