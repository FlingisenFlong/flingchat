import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import "./App.css"
import Home from "./pages/home/Home.jsx"
import Login from "./pages/login/Login.jsx"
import SignUp from "./pages/singup/SignUp.jsx"
import { useAuthContext } from "./context/AuthContext.jsx"
import Profile from "./pages/profile/Profile.jsx"

function App() {
  const { authUser } = useAuthContext()
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/profile"
            element={authUser ? <Navigate to="/login" /> : <Profile />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
