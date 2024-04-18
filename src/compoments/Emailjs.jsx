import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const EmailForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isValidFirstName, setIsValidFirstName] = useState(false);
    const [isValidLastName, setIsValidLastName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFirstNameChange = (event) => {
        const { value } = event.target;
        setFirstName(value);

        const firstNameRegex = /^[a-zA-Z]+$/;
        setIsValidFirstName(firstNameRegex.test(value));
    };

    const handleLastNameChange = (event) => {
        const { value } = event.target;
        setLastName(value);

        const lastNameRegex = /^[a-zA-Z]+$/;
        setIsValidLastName(lastNameRegex.test(value));
    };

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(value));
    };

    const handleMessageChange = (event) => {
        const { value } = event.target;
        setMessage(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidFirstName && isValidLastName && isValidEmail) {
            const serviceId = 'service_xd5x3t4';
            const templateId = 'template_n68wr5x';
            const userId = 'qaDRB8rTZ1s7xPkbH';

            const templateParams = {
                to_email: email,
                from_name: `${firstName} ${lastName}`,
                message: message
            };

            emailjs.send(serviceId, templateId, templateParams, userId)
                .then((response) => {
                    console.log('Email sent successfully:', response);
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setMessage('');
                    setIsValidFirstName(false);
                    setIsValidLastName(false);
                    setIsValidEmail(false);
                    setIsSubmitted(true);
                    setTimeout(() => setIsSubmitted(false), 3000);
                })
                .catch((error) => {
                    console.error('Email could not be sent:', error);
                });
        } else {
            alert('Please enter valid information.');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            disabled={isSubmitted}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                            disabled={isSubmitted}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            disabled={isSubmitted}
                        />
                    </label>
                    <label>
                        Message:
                        <textarea
                            value={message}
                            onChange={handleMessageChange}
                            disabled={isSubmitted}
                            className='resize-none'
                        />
                    </label>
                    <button type="submit" disabled={isSubmitted}>
                        {isSubmitted ? 'Submitted' : 'Submit'}
                    </button>
                </form>
                {isSubmitted && <p>Email submitted successfully!</p>}
            </div>
        </div>
    );
};

export default EmailForm;
