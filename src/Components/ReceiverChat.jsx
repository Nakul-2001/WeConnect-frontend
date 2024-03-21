import React from 'react'
import {styled} from 'styled-components'

const Container = styled.div`
  margin:2px;
  display: flex;
  flex-direction:column;
  align-items: start;
  max-width: 40%;
`

const Chat = styled.div`
  display:flex;
  gap:5px;
  align-items:flex-end;
`

const Text = styled.div`
  width:fit-content;
  background-color: #DCE8FF;
  color:black;
  border-radius:15px;
  padding:8px;
  max-width: 400px;
  overflow-wrap:break-word;
  
`

const Image = styled.img`
  height:50px;
  border:1px solid #4399FF;
  border-radius:50%;
`

const Time = styled.div`
  text-align:right;
  padding-right:5px;
  color:grey;
`

function ReceiverChat({user,mess}) {

  // Create a Date object from the date string
  const date = new Date(mess.createdAt);

// Get hours, minutes, and seconds from the Date object
  const hours = date.getHours().toString().padStart(2,'0');
  const minutes = date.getMinutes().toString().padStart(2,'0');

// Format the time
  const formattedTime = `${hours}:${minutes}`;

  return (
    <Container>
      <Chat>
        <Image src={user.profilepic}></Image>
        <Text>{mess.message}</Text>
      </Chat>
      <Time>{formattedTime}</Time>
    </Container>
  )
}

export default ReceiverChat
