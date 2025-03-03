// src/pages/ChatPage.js
import { Heart, Loader, UserX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BottomNavigation } from "../components/BottomNavigation";
import { Header } from "../components/Header";
import MessageInput from "../components/MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";

const ChatPage = () => {
    const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
    const { messages, getMessages, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
    const { authUser } = useAuthStore();
    const { id } = useParams(); // Current chat user ID from URL

    const [isFetching, setIsFetching] = useState(true);
    const messagesEndRef = useRef(null); // Ref for scrollable container

    // Fetch Matches
    useEffect(() => {
        getMyMatches();
    }, [getMyMatches]);

    const match = matches.find((m) => m?._id === id);

    // Scroll to bottom function
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    // Fetch Chat Messages and Subscribe to Socket
    useEffect(() => {
        if (authUser && id) {
            getMessages(id); // Fetch messages every time id changes
            subscribeToMessages(id); // Subscribe with current match ID
            setIsFetching(false);
        }

        return () => {
            unsubscribeFromMessages(); // Clean up on unmount or id change
        };
    }, [authUser, id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    // Scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Trigger on messages change (sent or received)

    if (isLoadingMyMatches || isFetching) return <LoadingMessagesUI />;
    if (!match) return <MatchNotFound />;

    return (
        <div className="flex h-screen">
            {/* Sidebar (Takes 25% Width) */}
            <div className="w-1/4 bg-pink-200 shadow-md h-full flex flex-col">
                <div className="p-4 border-b border-pink-300 bg-pink-300 h-14 flex items-baseline justify-center">
                    <h2 className="text-2xl font-bold text-pink-600">Messages</h2>
                </div>
                <div className="flex-grow overflow-y-auto p-4">
                    {isLoadingMyMatches ? (
                        <LoadingState />
                    ) : matches.length === 0 ? (
                        <NoMatchesFound />
                    ) : (
                        matches.map((match) => (
                            <Link key={match._id} to={`/chat/${match._id}`}>
                                <div
                                    className={`flex items-center mb-4 cursor-pointer p-2 rounded-lg transition ${match._id === id
                                            ? "bg-pink-500 text-white"
                                            : "bg-pink-300 hover:bg-pink-400 text-gray-800"
                                        }`}
                                >
                                    <img
                                        src={match.profilePhoto ? `/profilePhotos/${match.profilePhoto}` : "/avatar.png"}
                                        alt="User avatar"
                                        className="size-12 object-cover rounded-full mr-3 border-2 border-pink-300"
                                    />
                                    <h3 className="font-semibold">{match.name}</h3>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Content (Takes 75% Width) */}
            <div className="w-3/4 flex flex-col h-screen bg-gray-100 bg-opacity-50">
                <Header />
                <div className="flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden w-full mx-auto">
                    <div className="flex items-center mb-4 bg-white rounded-lg shadow p-3">
                        <img
                            src={match.profilePhoto ? `/profilePhotos/${match.profilePhoto}` : "/avatar.png"}
                            className="w-12 h-12 object-cover rounded-full mr-3 border-2 border-pink-300"
                        />
                        <h2 className="text-xl font-semibold text-gray-800">{match.name}</h2>
                    </div>
                    <div
                        ref={messagesEndRef} // Attach ref to scrollable div
                        className="flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4"
                    >
                        {messages.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">Start your conversation with {match.name}</p>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg._id} className={`mb-3 ${msg.sender === authUser._id ? "text-right" : "text-left"}`}>
                                    <span
                                        className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${msg.sender === authUser._id ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        {msg.content}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                    <MessageInput match={match} onSend={scrollToBottom} /> {/* Pass scroll function */}
                </div>
                <BottomNavigation />
            </div>
        </div>
    );
};

// ... Rest of the file unchanged ...

export default ChatPage;

const NoMatchesFound = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Heart className="text-pink-400 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Matches Yet</h3>
        <p className="text-gray-500 max-w-xs">Don&apos;t worry! Your perfect match is just around the corner. Keep swiping!</p>
    </div>
);

const LoadingMessagesUI = () => (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Loader size={48} className="mx-auto text-pink-500 animate-spin mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Chat</h2>
            <p className="text-gray-600">Please wait while we fetch your conversation...</p>
        </div>
    </div>
);

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Loader className="text-pink-500 mb-4 animate-spin" size={48} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Matches</h3>
        <p className="text-gray-500 max-w-xs">We&apos;re finding your perfect matches. This might take a moment...</p>
    </div>
);

const MatchNotFound = () => (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <UserX size={64} className="mx-auto text-pink-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Match Not Found</h2>
            <p className="text-gray-600">Oops! It seems this match doesn&apos;t exist or has been removed.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
                Go Back To Home
            </Link>
        </div>
    </div>
);
