import { extractTime } from "../../utils/extractTime"
import useConversation from "../../zustand/useConversation"
import { useAuthContext } from "./../../context/AuthContext"

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const fromMe = message.senderId === authUser._id
  const formatTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? "chat-end " : "chat-start"
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic
  const chatBgColor = fromMe ? "bg-green-700" : ""
  const isShaking = message.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${chatBgColor} ${isShaking} pb-2 break-words`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1">
        {formatTime}
      </div>
    </div>
  )
}
export default Message
