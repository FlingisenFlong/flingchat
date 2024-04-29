import { BiLogOut } from "react-icons/bi"
import useLogout from "../../hooks/useLogout"
import githubLogo from "../../assets/github.png"

const LogoutButton = () => {
  const { loading, logout } = useLogout()
  return (
    <div className="mt-auto flex flex-row">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  )
}
export default LogoutButton
