import { useEffect } from "react"

import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation"

import notificationSound from "../assets/sounds/notification.mp3"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useConversation()
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true
      const sound = new Audio(notificationSound)
      sound.play()

      if (selectedConversation?._id === newMessage.senderId) {
        setMessages([...messages, newMessage])
      } else {
        toast("new message", {
          icon: "💬",
          position: "bottom-right",
        })
      }
    })

    return () => socket?.off("newMessage")
  }, [socket, setMessages, messages])
}
export default useListenMessages
