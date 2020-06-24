import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams, createStream } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = (stream) => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className='right floated content'>
                    <Link className='ui button primary' to={`/streams/edit/${stream.id}`}>
                        Edit
                    </Link>
                    <Link className='ui button negative' to={`/streams/delete/${stream.id}`}>
                        Delete
                    </Link>
                </div>
            );
        }
    };

    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to='/streams/new' className='ui button primary'>
                        Create Stream
                    </Link>
                </div>
            );
        }
    };

    // TODO: come back to this, find out why
    // this.renderAdmin(stream) had to be moved up to work
    renderList = () => {
        return this.props.streams.map((stream) => {
            return (
                <div className='item' key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className='Large middle aligned icon camera' />
                    <div className='content'>
                        <Link to={`/streams/${stream.id}`} className='header'>
                            {stream.title}
                        </Link>
                        <div className='description'>{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className='ui celled list'>{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('list');
    console.log(state.streams);
    console.log(Object.values(state.streams));
    return {
        // Object.values() converts a list of Objects to an Array of Objects
        streams: Object.values(state.streams),
        // streams: state.streams,
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(
    mapStateToProps,
    { fetchStreams, createStream }
)(StreamList);
