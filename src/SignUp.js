import React from 'react';

import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password, email } = this.state;
        try {
            const response = await axios.post('https://blackjackserver-production.up.railway.app/api/register', { username, password});
            this.setState({ message: response.data.message, error: '' });
        } catch (error) {
            if (error.response) {
                this.setState({ error: error.response.data.error, message: '' });
            } else {
                this.setState({ error: 'An unexpected error occurred', message: '' });
            }
        }
    }

    render() {
        const { username, password, message, error } = this.state;
        return (
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        );
    }
}

export default SignUp;