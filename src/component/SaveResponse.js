import React from "react";
import './SaveResponse.css';

function SaveResponse() {
  const [userName, setUserName] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");
  const userResponse = [];
  const [allResponses, setAllResponses] = React.useState([]);
  const [stopInfiniteLoop, setStopInfiniteLoop] = React.useState(false);

  // Getting all the response
  if (!stopInfiniteLoop) {
    fetch(
      "https://learning-firebase-32398-default-rtdb.asia-southeast1.firebasedatabase.app/anomodb.json"
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        for (const dataItem in data) {
          // console.log(data[dataItem].userName, data[dataItem].userMessage);
          userResponse.push({
            userName: data[dataItem].userName,
            userMessage: data[dataItem].userMessage,
          });
        }
        setAllResponses(userResponse);
        // setUserResponse(data);
      })
    setStopInfiniteLoop(true);
  }

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('userName', userName);
    // console.log('userMessage', userMessage);
    if (userName === "" && userMessage === "") {
      alert("Sorry, Can't submit empty feedback");
      return;
    }

    // Create new responses (CRUD)

    fetch(
      "https://learning-firebase-32398-default-rtdb.asia-southeast1.firebasedatabase.app/anomodb.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName,
          userMessage: userMessage,
        })
      }
    ).then((res) => {
        // console.log('res', res);
        return res.json();
      }).then((data) => {
        // console.log('data', data);
      });

    setUserName("");
    setUserMessage("");

    // alert("Thankyou for submitting the feedback");
    window.location.reload();
  }

  return (
    <div className="container">
        <div className="heading">
          <h1>Anonymous.ly</h1>
        </div>
        <div className="sub-heading">
          <p>Feel free to share your feedback without revealing your identity.</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input className="userNameInput"
              type="text"
              placeholder="Enter your Name..."
              onChange={handleUserNameChange} value={userName}
            /><br/>
            <input className="userMessageInput"
              type="text"
              placeholder="Enter your Message....."
              onChange={handleUserMessageChange} value={userMessage}
            /><br/>
            <button className="form-submit" type="submit">Submit</button>
          </form>
        </div>

        <div className="response-container">
          {
              allResponses && (
                allResponses.map(item => {
                  return (
                    <div className="responses">
                      <p className="response-name">{item.userName} : </p> 
                      <p className="response-message">{item.userMessage}</p>
                    </div>
                  )
                })
              )
          }
        </div>
      </div>
  );
}

export default SaveResponse;
