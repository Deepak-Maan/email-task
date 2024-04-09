import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const EmailTemp = () => {
    const form = useRef();
    const [showPopup, setShowPopup] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        const userName = form.current.user_name.value.trim();
        const userEmail = form.current.user_email.value.trim();
        const message = form.current.message.value.trim();

        if (!userName || !userEmail || !message) {
            console.log("Please fill out all fields before sending.");
            return;
        }

        emailjs
            .sendForm("service_xd5x3t4", "template_n68wr5x", form.current, {
                publicKey: "qaDRB8rTZ1s7xPkbH",
            })
            .then(
                () => {
                    console.log("SUCCESS!");
                    setShowPopup(true);
                    form.current.user_name.value = "";
                    form.current.user_email.value = "";
                    form.current.message.value = "";

                    setTimeout(() => {
                        setShowPopup(false);
                    }, 3000);
                },
                (error) => {
                    console.log("FAILED.. .", error.text);
                }
            );
    };

    return (
        <div className="items-center justify-center min-h-screen flex">
            <div className="container">
                <h2>Contact Us</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <div className="form-group">
                        <label htmlFor="user_name">Name:</label>
                        <input type="text" id="user_name" name="user_name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_email">Email:</label>
                        <input type="email" id="user_email" name="user_email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <p className="text-white">Thanks for subscribing, our team will contact you soon</p>
                </div>
            )}
        </div>
    );
};