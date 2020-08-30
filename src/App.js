import React, { useState, useEffect } from "react";
import { Button, FormControl, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Components/Message";
import db from "./firebaseApp";
import FlipMove from "react-flip-move";
import firebase from "firebase";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(prompt("Please enter your name"));
  }, []);

  useEffect(() => {
    db.collection("Message")
      // .orderBy("timestamp", "asc") //for asending sorting
      .orderBy("timestamp", "desc") //for desending sorting
      .onSnapshot((snapshot) => {
        //
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); // To stop default reloading of the page after Enter is hit
    /* NOTE all the Logic for sending messages goes here */
    db.collection("Message").add({
      message: input,
      username: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  console.log(messages);
  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt=" "
      />
      <p className="heading">Chat Me</p>
      <h2 className="user">Welcome, {userName} </h2>

      {/* NOTE in this case the form in used to make the submit work on Enter key */}

      <form className="form">
        <FormControl className="formControl">
          <Input
            className="input"
            placeholder="The Chat is Disabled"
            type="text"
            // value={
            //   input
            // } /*NOTE to enable chat unComment this line and comment the line 62 and 63 */
            value="The Chat is Disabled"
            disabled={true}
            color="primary"
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="iconButton"
            variant="outlined"
            type="submit"
            disabled={!input}
            color="primary"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          /* TODO Uncomment the very next line and vice versa line 85 */
          // <Message key={id} message={message} username={userName} />
          <Message key={id} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
