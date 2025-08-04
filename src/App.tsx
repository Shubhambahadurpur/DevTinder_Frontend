import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Body from './components/Body'
import Login from './components/Login'
import { Provider } from 'react-redux'
import { appStore } from './utils/appStore'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Connections from './components/Connections'
import ConnectionRequests from './components/ConnectionRequests'
function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Body />} >
            <Route path='login' element={<Login />} />
            <Route path='feed' element={<Feed />} />
            <Route path='profile' element={<Profile />} />
            <Route path='connections' element={<Connections />} />
            <Route path='connection-requests' element={<ConnectionRequests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
