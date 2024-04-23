import generateTokenAndSaveCookie from "../utils/generateToken.js"
import User from "./../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body

    // Check if username contains spaces
    if (username.includes(" ")) {
      return res.status(400).json({ error: "Username cannot contain spaces" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({})
    }

    const user = await User.findOne({ username })
    const toShort = username.length < 4 || username.length > 15

    if (user) {
      return res.status(400).json({ error: "Username already exists" })
    }
    if (toShort) {
      return res
        .status(400)
        .json({ error: "Username must be between 4 and 15 characters" })
    }

    // HASH PASSWORD
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    })

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSaveCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ error: "Invalid user data" })
    }
  } catch (error) {
    console.log("error in signup controller", error)
    res.status(500).json({ error: "internal server error" })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    )

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" })
    }
    generateTokenAndSaveCookie(user._id, res)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    })
  } catch (error) {
    console.log("error in login controller", error)
    res.status(500).json({ error: "internal server error" })
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "successfully logged out" })
  } catch (error) {
    console.log("error in logout controller", error)
    res.status(500).json({ error: "internal server error" })
  }
}
