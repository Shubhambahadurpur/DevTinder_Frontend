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
import SignUp from './components/SignUp'
import NotFound from './components/NotFound'
function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Body />} >
            <Route path='' element={<Feed />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='profile' element={<Profile />} />
            <Route path='connections' element={<Connections />} />
            <Route path='connection-requests' element={<ConnectionRequests />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
