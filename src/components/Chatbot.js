import React, { Component } from "react";
import "./Chatbot.scss";
import { AmplifyChatbot } from "@aws-amplify/ui-react/legacy";

class Chatbot extends Component {
  state = {};

  render() {
    return (
      <AmplifyChatbot
        title="Safe Deposit Bot"
        botName="BookTrip_dev"
        welcomeMessage="Welcome, how can I help you today?"
        // clearOnComplete={true}
      />
    );
  }
}

export default Chatbot;
