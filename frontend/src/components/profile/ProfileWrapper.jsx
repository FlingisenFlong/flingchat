import { useState } from "react"
import { GoArrowRight } from "react-icons/go"
import { useAuthContext } from "../../context/AuthContext"

const ProfileWrapper = () => {
  const [open, setOpen] = useState(false)
  const { authUser } = useAuthContext()

  return (
    <div>
      {open ? (
        <div>Open</div>
      ) : (
        <div>
          <img
            src={authUser.profilePic}
            alt=""
            width="40px"
            height="40px"
            onClick={() => setOpen(true)}
          />
        </div>
      )}
    </div>
  )
}
export default ProfileWrapper
