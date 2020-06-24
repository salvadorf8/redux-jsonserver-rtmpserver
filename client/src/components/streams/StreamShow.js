import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params;

        //setting up the player
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });

        //feeding mp4 segments into an HTML5 <video> element
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }

        const { title, description } = this.props.stream;

        console.log('sneakpeek - this.videoRef: ', this.videoRef);

        return (
            <div>
                {/*  good to know about this JSX.IntrinsicElements.video TAG, also just by passing just controls like this is like setting it to true  */}
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{title}</h1>
                <div>{description}</div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("I'm here");
    console.log(ownProps);
    console.log(state);
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
    mapStateToProps,
    { fetchStream }
)(StreamShow);
