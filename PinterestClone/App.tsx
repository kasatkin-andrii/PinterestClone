import React from 'react'
import {store} from './src/redux/store'
import {Provider} from 'react-redux'
import Navigation from './src/navigation/Navigation'

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App
