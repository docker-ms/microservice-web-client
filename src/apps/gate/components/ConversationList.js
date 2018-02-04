import React from 'react';

import FontIcon from 'material-ui/FontIcon';

import moment from 'moment';

const styles = {
  convContainer: {
    height: '59px',
    borderBottom: '1px solid #efefef',
    padding: '8px',
    position: 'relative',
    cursor: 'pointer',

    active: {
      backgroundColor: '#f3f3f3'
    }
  },
  convIcon: {
    display: 'block',
    width: '15%',
    float: 'left',
    fontSize: '2.3em',
    lineHeight: '59px'
  },
  convSummaryContainer: {
    width: 'calc(85% - 90px)',
    float: 'left',
    paddingLeft: '8px',

    primaryText: {
      display: 'block',
      margin: '8px 0 5px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    secondaryText: {
      display: 'block',
      color: '#989898'
    },
    rightTimestamp: {
      width: '70px',
      textAlign: 'right',
      display: 'block',
      position: 'absolute',
      top: '8px',
      right: '3px'
    }
  }
};

class ConversationList extends React.Component {

  render() {
    const snapshots = this.props.snapshots;
    const items = snapshots.map((snapshot) => {
      let timestamp;
      const now = moment();
      const tmp = moment(+snapshot.messages[0].createAt);
      if (tmp.year() === now.year() && tmp.month() === now.month() && tmp.day() === now.day()) {
        timestamp = tmp.format('kk:mm');
      } else {
        timestamp = tmp.format('DD/MM/YY');
      }
      return (
        <div key={snapshot.conversation.conversationId}
             style={
              Object.assign({},
                              styles.convContainer,
                              snapshot.conversation.conversationId === this.props.currentActiveConvId && styles.convContainer.active)}
             onTouchTap={() => {this.props.switchActiveConv(snapshot.conversation.conversationId)}}>
          <FontIcon className="material-icons" style={styles.convIcon}>bookmark_border</FontIcon>
          <div style={styles.convSummaryContainer}>
            <span style={styles.convSummaryContainer.primaryText}>{snapshot.conversation.conversationId}</span>
            <span style={styles.convSummaryContainer.secondaryText}>
              {snapshot.group ? Object.keys(snapshot.group.members).length : Object.keys(snapshot.conversation.members).length} Users
            </span>
            <span style={styles.convSummaryContainer.rightTimestamp}>
              {timestamp}
            </span>
          </div>
        </div>
      );
    });
    return (
      <div>
        {items}
      </div>
    );
  }

}

export default ConversationList;


