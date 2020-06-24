import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
    
    //without the redux-form, you'll add an onSubmit function passing an event parameter, then call event.preventDefault() to prevent the page from refreshing.  
    //This is no longer necessary when using redux-form, event is received automatically, and calls preventDefault for us... 
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm  onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);