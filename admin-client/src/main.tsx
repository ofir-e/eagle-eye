import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { AdminTableContainer } from './AdminTable'

render(
  <React.StrictMode>
    <AdminTableContainer />
  </React.StrictMode>,
  document.getElementById('root')
)
