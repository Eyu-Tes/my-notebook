import React from 'react'
import ReactDOM from 'react-dom'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import './index.css'
import App from './App'

TimeAgo.addDefaultLocale(en)

ReactDOM.render(<App />, document.getElementById('root'))
