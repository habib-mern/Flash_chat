import './App.css'
import Chat from './pages/Chat'
import Group from './pages/Group'
import Home from './pages/Home'
import Profile from '../src/pages/Profile'
import Login from '../src/pages/registration/Login'
import Registration from '../src/pages/registration/Registration'
import Error from '../src/pages/Error'
import  {Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>



    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/registration' element={<Registration/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      <Route path='/group' element={<Group/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='*' element={<Error/>}></Route>
    </Routes>
   {/* <SideNavbar>
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      <Route path='/group' element={<Group/>}></Route>
      <Route path='/friends' element={<Friends/>}></Route>
    </Routes>
    </SideNavbar> */}
    </>
  )
}

export default App
