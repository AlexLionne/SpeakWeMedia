import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import * as appPropTypes from './appPropTypes';
import {withRoomContext} from '../RoomContext';
import {Appear} from './transitions';
import Me from './Me';
import Peers from './Peers';
import Stats from './Stats';
import Notifications from './Notifications';
import NetworkThrottle from './NetworkThrottle';
import {If} from "babel-plugin-jsx-control-statements";

class Room extends React.Component {
    render() {
        const {
            room,
        } = this.props;

        return (
            <Appear duration={300}>
                <div data-component='Room'>
                    <Notifications/>

                    <div className='state'>
                        <div className={classnames('icon', room.state)}/>
                        <p className={classnames('text', room.state)}>{room.state}</p>
                    </div>

                    <Peers/>
                    <Me/>
                    <Stats/>
                    <If condition={window.NETWORK_THROTTLE_SECRET}>
                        <NetworkThrottle
                            secret={window.NETWORK_THROTTLE_SECRET}
                        />
                    </If>
                </div>
            </Appear>
        );
    }

    componentDidMount() {
        const {roomClient} = this.props;

        roomClient.join();
    }
}

Room.propTypes =
    {
        roomClient: PropTypes.any.isRequired,
        room: appPropTypes.Room.isRequired,
        me: appPropTypes.Me.isRequired,
        amActiveSpeaker: PropTypes.bool.isRequired,
        onRoomLinkCopy: PropTypes.func.isRequired
    };

const mapStateToProps = (state) => {
    return {
        room: state.room,
        me: state.me,
        amActiveSpeaker: state.me.id === state.room.activeSpeakerId
    };
};

const RoomContainer = withRoomContext(connect(
    mapStateToProps,
    null
)(Room));

export default RoomContainer;
