import React, { useRef, useEffect, useState } from "react";

import ChatWindow from './ChatWindow'

import Avatar from './Avatar'

const ChatEngine = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [visible, setVisible] = useState(false)

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef}>
            <ChatWindow visible={visible} />

            <Avatar 
                onClick={() => setVisible(true)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                }}
            />
        </div>
    )
}

export default ChatEngine;

