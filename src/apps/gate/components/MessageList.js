import React from 'react';

import FontIcon from 'material-ui/FontIcon';

import moment from 'moment';

const styles = {
  rootContainer: {
    margin: '15px',
    height: 'calc(100% - 136px)',
    overflowY: 'scroll'
  },
  messageItemContainer: {
    float: 'left',
    marginBottom: '20px',
    width: '100%'
  },
  senderAvatar: {
    display: 'block',
    width: '60px',
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center',
    float: 'left',
    fontSize: '50px',
    border: '1px solid #cbcbcb',
    borderRadius: '8px',
    backgroundColor: '#cbcbcb'
  },
  messageContainer: {
    width: 'calc(100% - 72px)',
    float: 'right',
    lineHeight: '130%',

    sender: {
      display: 'block',
      marginBottom: '5px',
      color: '#b2b4b5'
    },

    messageBubble: {
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      wordWrap: 'break-word',

      message: {
        display: 'block'
      },
      footer: {
        display: 'block',
        marginTop: '5px',
        color: '#b2b4b5'
      }
    }
  }
};

class MessageList extends React.Component {

  render() {
    const messagesOfActiveConvs = this.props.messagesOfActiveConvs;
    const items = messagesOfActiveConvs.map((message, idx) => {
      return (
        <div key={idx} style={styles.messageItemContainer}>
          <FontIcon className="material-icons" style={styles.senderAvatar}>face</FontIcon>
          <div style={styles.messageContainer}>
            <span style={styles.messageContainer.sender}>{message.sender}</span>
            <div style={styles.messageContainer.messageBubble}>
              <span style={styles.messageContainer.messageBubble.message}>{message.content || message.resources[0].original}</span>
              <span style={styles.messageContainer.messageBubble.footer}>
                {moment(+message.createAt).format('DD MMM kk:mm')}
              </span>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div style={styles.rootContainer}>
        {items}
      </div>
    );
  }

}

export default MessageList;


