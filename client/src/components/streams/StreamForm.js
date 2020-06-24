import React from 'react';
// reason for capital F and lowercase r is because Field is a component, and reduxForm is a function which is also the exact same functionality
// as the connect function we used for redux library
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className='ui error message'>
					<div className='header'>{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ label, input, meta }) => {
		// excellent note: syntax
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} />
				<div>{this.renderError(meta)}</div>
			</div>
			// below is same as the next commented line
			// This --> <input {...input} />
			// Same as --> <input onChange={formProps.input.onChange} value={formProps.input.name} />
		);
	};

	//without the redux-form, you'll add an onSubmit function passing an event parameter, then call event.preventDefault() to prevent the page from refreshing.
	//This is no longer necessary when using redux-form, event is received automatically, and calls preventDefault for us...
	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
				{/* name, and component property is required, Field is not responsible to getting anything to show up on the screen,
                 its part of the system to automatically handle all the forms you put together */}
				<Field name='title' label='Enter Title' component={this.renderInput} />
				<Field name='description' label='Enter Description' component={this.renderInput} />
				<button className='ui button primary'>Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}

	return errors;
};

//unlike the connect function like it takes separate arguments, reduxForm receives a single object
// export default reduxForm({ form: 'streamCreate', validate: validate })(StreamCreate);

export default reduxForm({ form: 'streamForm', validate: validate })(StreamForm);
