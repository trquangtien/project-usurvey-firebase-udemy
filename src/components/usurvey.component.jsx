import React from 'react';
import firebase from 'firebase';
import uuid from 'uuid';

var config = {
    apiKey: "AIzaSyC55mQzFeOQLknUi7J_yY4btb8RNpC5Y_I",
    authDomain: "usurvey-3da57.firebaseapp.com",
    databaseURL: "https://usurvey-3da57.firebaseio.com",
    projectId: "usurvey-3da57",
    storageBucket: "usurvey-3da57.appspot.com",
    messagingSenderId: "904655756199"
};
firebase.initializeApp(config);

class Uservey extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmited: false
        }
    }

    submitName(event) {
        this.setState({
            studentName: this.refs.txtStudentName.value
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        var studentName;
        var questions;

        if (this.state.studentName === '' && this.state.isSubmited === false) {
            studentName = <div>
                <h1>Hey student, please let us know your name!</h1>
                <form onSubmit={this.submitName.bind(this)}>
                    <input id="txtStudentName" type="text" placeholder="Enter your name" ref="txtStudentName" />
                </form>
            </div>
        }

        return (
            <div>
                {studentName}
                -----------------------------------------------
                {questions}
            </div>
        );
    }
}

export default Uservey;