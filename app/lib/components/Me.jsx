import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import * as cookiesManager from '../cookiesManager';
import * as appPropTypes from './appPropTypes';
import {withRoomContext} from '../RoomContext';
import * as stateActions from '../redux/stateActions';
import PeerView from './PeerView';

class Me extends React.Component {
    constructor(props) {
        super(props);

        this._mounted = false;
        this._rootNode = null;
    }

    render() {
        const {
            roomClient,
            connected,
            me,
            audioProducer,
            videoProducer,
            faceDetection,
            onSetStatsPeerId
        } = this.props;

        const videoVisible = Boolean(videoProducer) && !videoProducer.paused;

        return (
            <PeerView
                isMe
                peer={me}
                audioProducerId={audioProducer ? audioProducer.id : null}
                videoProducerId={videoProducer ? videoProducer.id : null}
                audioRtpParameters={audioProducer ? audioProducer.rtpParameters : null}
                videoRtpParameters={videoProducer ? videoProducer.rtpParameters : null}
                audioTrack={audioProducer ? audioProducer.track : null}
                videoTrack={videoProducer ? videoProducer.track : null}
                videoVisible={videoVisible}
                audioCodec={audioProducer ? audioProducer.codec : null}
                videoCodec={videoProducer ? videoProducer.codec : null}
                audioScore={audioProducer ? audioProducer.score : null}
                videoScore={videoProducer ? videoProducer.score : null}
                faceDetection={faceDetection}
                onChangeDisplayName={(displayName) => {
                    roomClient.changeDisplayName(displayName);
                }}
                onChangeMaxSendingSpatialLayer={(spatialLayer) => {
                    roomClient.setMaxSendingSpatialLayer(spatialLayer);
                }}
                onStatsClick={onSetStatsPeerId}
            />
        );
    }

    componentDidMount() {
        this._mounted = true;

        setTimeout(() => {
            if (!this._mounted || this.props.me.displayNameSet)
                return;

            ReactTooltip.show(this._rootNode);
        }, 4000);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.me.displayNameSet && this.props.me.displayNameSet)
            ReactTooltip.hide(this._rootNode);
    }
}

Me.propTypes =
    {
        roomClient: PropTypes.any.isRequired,
        connected: PropTypes.bool.isRequired,
        me: appPropTypes.Me.isRequired,
        audioProducer: appPropTypes.Producer,
        videoProducer: appPropTypes.Producer,
        faceDetection: PropTypes.bool.isRequired,
        onSetStatsPeerId: PropTypes.func.isRequired
    };

const mapStateToProps = (state) => {
    const producersArray = Object.values(state.producers);
    const audioProducer =
        producersArray.find((producer) => producer.track.kind === 'audio');
    const videoProducer =
        producersArray.find((producer) => producer.track.kind === 'video');

    return {
        connected: state.room.state === 'connected',
        me: state.me,
        audioProducer: audioProducer,
        videoProducer: videoProducer,
        faceDetection: state.room.faceDetection
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetStatsPeerId: (peerId) => dispatch(stateActions.setRoomStatsPeerId(peerId))
    };
};

const MeContainer = withRoomContext(connect(
    mapStateToProps,
    mapDispatchToProps
)(Me));

export default MeContainer;
