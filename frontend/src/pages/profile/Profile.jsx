import { IoCaretBackSharp } from "react-icons/io5"
import { useAuthContext } from "../../context/AuthContext"

const Profile = () => {
  const { authUser } = useAuthContext()

  // Check if authUser exists before accessing its properties
  if (!authUser) {
    // You can return a loading indicator or handle the null case as per your requirement
    return <div>Loading...</div>
  }

  return (
    <div className="flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex-col">
      <IoCaretBackSharp className="text-3xl text-gray-300" />
      <span>Back</span>
      <br />
      <h1 className="text-3xl font-semibold text-center text-gray-300 mx-4 mt-2">
        Profile
      </h1>
      {/* Use optional chaining to safely access properties */}
      <img src={authUser?.profilePic} alt="" />
      <p>{authUser?.fullName}</p>
      <p>@{authUser?.username}</p>
    </div>
  )
}

export default Profile
