import React, { Component } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"

class MailChimpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      result: {},
    }
  }

  _handleChange = e => {
    e.preventDefault()
    const { value } = e.target
    if (value === "") {
      this.setState({
        email: value,
        result: {},
      })
    } else {
      this.setState({
        email: value,
      })
    }
  }

  _handleSubmit = async e => {
    e.preventDefault()
    const { email } = this.state
    if (email !== "") {
      const result = await addToMailchimp(email)
      this.setState({ result })
    }
  }

  render() {
    const { result: resultObject, email } = this.state
    const { result, msg } = resultObject
    const isError = result === "error"
    return (
      <div id="mc_embed_signup">
        <form
          onSubmit={this._handleSubmit}
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          noValidate
        >
          <div id="mc_embed_signup_scroll">
            <h1 htmlFor="mce-EMAIL">
              Subscribe to my News Letter{" "}
              <span role="img" aria-label="mail">
                💌
              </span>
            </h1>
            <input
              type="email"
              value={email}
              name="EMAIL"
              onChange={this._handleChange}
              className="email"
              id="mce-EMAIL"
              placeholder="email address"
              required
            />
            <span
              dangerouslySetInnerHTML={{
                __html: msg,
              }}
              className={isError ? "error-text" : "success-text"}
            />
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_cbe70539edc727339a4318cd8_1ae9e74486"
                tabIndex="-1"
                value=""
              />
            </div>
            <div className="clear">
              {!result && (
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default MailChimpForm
