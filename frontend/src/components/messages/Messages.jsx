import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useAuthContext from '../../context/AuthContext.jsx'
import useConversation from "../../zustand/useConversation.jsx"

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const { authUser } = useAuthContext()
	const lastMessageRef = useRef();

	const { selectedConversation } = useConversation()

	const messagesForThisConversation = messages.filter(x => {
		if (x.receiverId === authUser.id && x.senderId === selectedConversation) return true
		if (x.senderId === authUser.id  && x.receiverId === selectedConversation) return true

		return false
	})

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messagesForThisConversation]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messagesForThisConversation.length > 0 &&
				messagesForThisConversation.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messagesForThisConversation.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;