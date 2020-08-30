import React, { forwardRef } from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import "../Css/message.css";

/* TODO For production remove the default value to the username */
const Message = forwardRef(({ message, username = "User 2" }, ref) => {
  const isUser = username === message.username;
  console.log(username);
  console.log(message.username);
  console.log(isUser);

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? " message__userCard" : " message__guestCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && `${message.username || "Unknown"}:`}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
