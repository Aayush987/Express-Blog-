import './App.css'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import Layout from './components/Layout'
import { UserContextProvider } from './UserContext'
import CreatePost from "./pages/CreatePost"
import PostPage from "./pages/PostPage"
import EditPost from "./pages/EditPost"
import AuthorProfilePage from './pages/AuthorProfilePage'

function App() {
  
  return (
    <>
    <UserContextProvider>
    <Routes>
      <Route path = "/" element = {<Layout />}>
        <Route index element =  {<HomePage />}  />
        <Route path ="/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/create" element = {<CreatePost />} />
        <Route path = "/post/:id" element = {<PostPage />} />
        <Route path = "/edit/:id" element = {<EditPost />} />
        <Route path = "/author/:name" element = {<AuthorProfilePage />} />
      </Route>
    </Routes>
    </UserContextProvider>
    </>
  )
}

export default App
