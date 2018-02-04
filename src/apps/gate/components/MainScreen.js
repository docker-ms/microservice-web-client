import React, { Component } from 'react';

import FontIcon from 'material-ui/FontIcon';

import ConversationList from './ConversationList';
import MessageList from './MessageList';

const styles = {
  rootContainer: {
    height: '100%',
    minWidth: '880px'
  },
  leftContainer: {
    position: 'relative',
    width: '70px',
    height: '100%',
    float: 'left',
    borderRight: '1px solid #e5e5e5',

    avatar: {
      width: '80%',
      height: 'auto',
      display: 'block',
      margin: '60px auto'
    },

    fontIconsCommon: {
      display: 'block',
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '2.3em'
    },

    settingsIcon: {
      position: 'absolute',
      width: '100%',
      bottom: '15px'
    }
  },
  middleContainer: {
    width: '260px',
    height: '100%',
    float: 'left',
    borderRight: '1px solid #e5e5e5'
  },
  rightContainer: {
    float: 'right',
    width: 'calc(100% - 332px)',
    height: '100%',
    backgroundColor: '#f3f3f3',
    position: 'relative',

    sendMessageBox: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 'calc(100% - 5px)',
      border: '1px solid #e5e5e5',
      resize: 'none',
      outline: 'none',
      height: '100px'
    }
  }
};

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentActiveConv: null,
      messageToBeSent: ''
    };
  }

  componentWillMount() {
    this.props.onCompnoentWillMount();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mainScreen.url !== nextProps.mainScreen.url) {
      console.log(nextProps.mainScreen.url)
      this.props.history.push(nextProps.mainScreen.url);
    }
    if (nextProps.mainScreen.snapshots.length) {
      if (this.props.mainScreen.complement) {
        nextProps.mainScreen.snapshots.forEach((snapshot) => {
          Object.keys(this.props.mainScreen.complement.new.messages).forEach((messageId) => {
            if (snapshot.conversation.conversationId === this.props.mainScreen.complement.new.messages[messageId].toConversationId) {
              snapshot.messages.push(this.props.mainScreen.complement.new.messages[messageId]);
              delete this.props.mainScreen.complement.new.messages[messageId];
            }
          });
        });
      }

      if (!this.state.currentActiveConv) {
        this.setState({
          currentActiveConv: nextProps.mainScreen.snapshots[0].conversation
        });
      }
    }
  }

  switchActiveConv = (convId) => {
    if (convId !== this.state.currentActiveConv.conversationId) {
      let tmp;
      this.props.mainScreen.snapshots.every((snapshot) => {
        if (snapshot.conversation.conversationId === convId) {
          tmp = snapshot.conversation;
          return false
        }
        return true;
      });
      this.setState({
        currentActiveConv: tmp
      });
    }
  }

  onMessageSendingBoxContentChange = (newVal) => {
    this.setState({
      messageToBeSent: newVal
    });
  }

  onMessageSendingBoxEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const toBeSentMessage = Object.assign({
        messageType: 'TEXT',
        conversationType: this.state.currentActiveConv.conversationType,
        toConversationId: this.state.currentActiveConv.conversationId,
        forGroupId: this.state.currentActiveConv.conversationId
      }, {
        content: this.state.messageToBeSent
      });

      this.props.onMessageSendingBoxEnter(toBeSentMessage);

      this.setState({
        messageToBeSent: ''
      });
    }
  }

  render() {

    console.log('I am rendering........................')

    let corrSnapshot;

    if (this.state.currentActiveConv) {
      corrSnapshot = this.props.mainScreen.snapshots.find((snapshot) => {
        return snapshot.conversation.conversationId === this.state.currentActiveConv.conversationId;
      });
    }

    return (
      <div style={styles.rootContainer}>
        <div style={styles.leftContainer}>
          <img src={require("../../../resources/images/avatar.png")} style={styles.leftContainer.avatar} alt="..." />
          <FontIcon className="material-icons" style={styles.leftContainer.fontIconsCommon}>message</FontIcon>
          <FontIcon className="material-icons" style={styles.leftContainer.fontIconsCommon}>assignment_ind</FontIcon>
          <FontIcon className="material-icons" style={styles.leftContainer.fontIconsCommon}>favorite_border</FontIcon>
          <FontIcon className="material-icons" style={{...styles.leftContainer.fontIconsCommon, ...styles.leftContainer.settingsIcon}}>
            view_headline
          </FontIcon>
        </div>
        <div style={styles.middleContainer}>
          <ConversationList snapshots={this.props.mainScreen.snapshots}
                            switchActiveConv={this.switchActiveConv}
                            currentActiveConvId={this.state.currentActiveConv && this.state.currentActiveConv.conversationId} />
        </div>
        <div style={styles.rightContainer}>
          {
            this.state.currentActiveConv &&
              <MessageList messagesOfActiveConvs={corrSnapshot.messages} />
          }
          <textarea style={styles.rightContainer.sendMessageBox}
                    value={this.state.messageToBeSent}
                    onChange={(e) => {this.onMessageSendingBoxContentChange(e.target.value)}}
                    onKeyDown={(e) => {this.onMessageSendingBoxEnter(e)}}></textarea>
        </div>
      </div>
    );
  }
}

export default MainScreen;


