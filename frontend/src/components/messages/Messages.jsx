import { useEffect, useRef } from "react"
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton"
import Message from "./Message"
import useListenMessages from "../../hooks/useListenMessages"
import useConversation from "../../zustand/useConversation"

const Messages = () => {
  const { messages, loading } = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()
  const { selectedConversation } = useConversation()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto p-0">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  )
}
export default Messages
