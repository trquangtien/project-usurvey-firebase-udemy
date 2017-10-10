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

    answerSelected(event) {
        var answers = this.state.answers;

        if (event.target.name === 'answer1') {
            answers.answer1 = event.target.value;
        }
        else if (event.target.name === 'answer2') {
            answers.answer2 = event.target.value;
        }
        else if (event.target.name === 'answer3') {
            answers.answer3 = event.target.value;
        }

        this.setState({
            answers: answers
        }, () => {
            console.log(this.state);
        });
    }

    submitQuestion() {
        firebase.database().ref('uSurvey/' + this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });

        this.setState({
            isSubmited: true
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
        else if (this.state.studentName != '' && this.state.isSubmited === false) {
            studentName = <h1>Welcome to U-Servey, {this.state.studentName}</h1>;
            questions = <div>
                <h2>Here are some questions: </h2>
                <form onSubmit={this.submitQuestion.bind(this)}>
                    <div className="card">
                        <label>What programing language you like the most:</label><br />
                        <input type="radio" name="answer1" value="react" onChange={this.answerSelected.bind(this)} />React JS
                        <input type="radio" name="answer1" value="angular" onChange={this.answerSelected.bind(this)} />Angular JS
                        <input type="radio" name="answer1" value="vue" onChange={this.answerSelected.bind(this)} />Vue JS
                    </div>

                    <div className="card">
                        <label>You are a:</label><br />
                        <input type="radio" name="answer2" value="student" onChange={this.answerSelected.bind(this)} />Student
                        <input type="radio" name="answer2" value="injob" onChange={this.answerSelected.bind(this)} />In Job
                        <input type="radio" name="answer2" value="lookingjob" onChange={this.answerSelected.bind(this)} />Looking Job
                    </div>

                    <div className="card">
                        <label>Is online learning helpful:</label><br />
                        <input type="radio" name="answer3" value="yes" onChange={this.answerSelected.bind(this)} />Yes
                        <input type="radio" name="answer3" value="no" onChange={this.answerSelected.bind(this)} />No
                        <input type="radio" name="answer3" value="maybe" onChange={this.answerSelected.bind(this)} />Maybe
                    </div>

                    <input className="feedback-button" type="submit" value="Submit" />
                </form>
                <br />
            </div>
        }
        else if (this.state.isSubmited === true) {
            studentName = <h1>Thanks, {this.state.studentName}</h1>
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