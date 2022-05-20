import React, { Component } from 'react'
import './SMSForm.css'

export default class SMSForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            message: {
                to: '',
                body: ''
            },
            submitting: false,
            error: false,
            maxChars: 160,
            charsLeft: 160,
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.handleCharCount = this.handleCharCount.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onHandleChange(event) {
        const name = event.target.getAttribute('name')
        
        this.setState({
            message: { ...this.state.message, [name]: event.target.value},
        })
    }
    handleCharCount(event) {
        const msg = event.target.value
        this.setState({charsLeft: this.state.maxChars - msg.length})
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({submitting: true});
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.message)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                this.setState({
                    error:false,
                    submitting: false,
                    message: {
                        to: '',
                        body: ''
                    }
                })
            } else {
                this.setState({
                    error: true,
                    submitting: false
                })
            }
            
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className='sms-form'>
                <div className="inputFields">
                    <input
                        type="tel"
                        name="to"
                        id="to"
                        placeholder="Phone Number"
                        value={this.state.message.to}
                        onChange={this.onHandleChange}
                    />
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        value={this.state.message.firstName}
                        onChange={this.onHandleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        value={this.state.message.lastName}
                        onChange={this.onHandleChange}
                    />
                    <input
                        type="text"
                        name="zip"
                        id="zip"
                        placeholder="Zip Code"
                        value={this.state.message.zip}
                        onChange={this.onHandleChange}
                    />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={this.state.message.email}
                        onChange={this.onHandleChange}
                    />
                    <textarea 
                        name="body"
                        id="body"
                        placeholder="Message Body"
                        value={this.state.message.body}
                        onChange={this.onHandleChange}
                        onInput={this.handleCharCount}
                    />
                    <span id="charcount">{this.state.charsLeft} Characters remaining</span>
                </div>
                <button type="submit" disabled={this.state.submitting}> 
                    Send message
                </button>
                {this.state.error && 
                    <span className="error">an error has occurred, please refresh and try again</span>
                    }
            </form>
        )
    }
}
