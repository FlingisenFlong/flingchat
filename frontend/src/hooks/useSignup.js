import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    })
    if (!success) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      })
      const data = await res.json()
      if (data.error) {
        if (data.error === "Username already exists") {
          toast.error("Username already exists. Please choose another one.")
        } else if (
          data.error === "Username must be between 4 and 15 characters"
        ) {
          toast.error("Username must be between 4 and 15 characters")
        } else if (data.error === "Username cannot contain spaces") {
          toast.error("Username cannot contain spaces")
        } else {
          throw new Error(data.error)
        }
      } else {
        // Save to local storage
        localStorage.setItem("flingchat-user", JSON.stringify(data))
        // Update context
        setAuthUser(data)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { loading, signup }
}

export default useSignup

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields")
    return false
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match")
    return false
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters")
    return false
  }

  return true
}
