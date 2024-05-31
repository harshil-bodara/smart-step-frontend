import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPaperPlane } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";

import ProfileLayout from '../../components/Layout/ProfileLayout';
import { errorToast } from '../../components/ToasterAlert';
import { REQUIRED_MSG } from '../../constants';
import { getAllMessages, sendMessageToAgent } from '../../services/university';
import { useSelector } from 'react-redux';

const ChatWithAgent = () => {

    const [messages, setMessages] = useState([]);

    const user = useSelector(state => state.user.userProfile);

    console.log("user >>", user);

    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    useEffect(() => {
        fetchMessages();
    }, [])

    // EP
    const handleMessage = async (data) => {
        try {
            const response = await sendMessageToAgent(data);
            fetchMessages();
            reset();
        } catch (error) {
            errorToast(error.response.data.message)
        } finally {

        }
    }

    const fetchMessages = async () => {
        try {
            const response = await getAllMessages();
            setMessages(response.data.messages);
        } catch (error) {

        }
    }

    return (
        <ProfileLayout>
            <div className="card mb-3">
                <div className="card-body">
                    {(!user?.agent || user?.agent.length === 0) ? <>
                        <div style={{ maxHeight: 589, minHeight: 589, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", width: "75%", margin: "auto" }}>
                            <FaUserAltSlash style={{ fontSize: 60, marginBottom: 24 }} />
                            <p>No Agent has been assigned yet, please fill the studyPreferences and try applying to any university.</p>
                        </div>
                    </> : <>
                        <div className="card-title mb-3" style={{ fontSize: 20, fontWeight: "500" }}>Notifications</div>
                        <div
                            style={{ maxHeight: 460, minHeight: 460, overflowY: "auto" }}
                        >
                            {messages.map((msg, index) => <div className="card notification-card notification-invitation mb-2">
                                <div className="card-body">
                                    <h5 className='m-0' style={{ color: msg.sender === "user" ? "#308bea" : "#ff1949" }}>
                                        {msg.sender === "user" ? "You" : "Agent"}
                                    </h5>
                                    <div className="card-title m-0">{msg.message}</div>
                                </div>
                            </div>)}
                        </div>
                        <div className="card-footer" style={{ background: "transparent" }}>
                            <form onSubmit={handleSubmit(handleMessage)}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        placeholder="Type your message here..."
                                        {...register("message", {
                                            required: REQUIRED_MSG
                                        })}
                                    />
                                    <span className="input-group-btn">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            id="btn-chat"
                                            style={{ padding: "8px 12px" }}
                                        >
                                            <FaPaperPlane />
                                        </button>
                                    </span>
                                </div>
                                {errors.message && <p
                                    className="required"
                                    style={{ fontWeight: 400, letterSpacing: "0.2px", fontSize: 14, margin: 0 }}
                                >
                                    {errors.message.message}
                                </p>}
                            </form>
                        </div>
                    </>}
                </div>
            </div>
        </ProfileLayout>
    )
}

export default ChatWithAgent;