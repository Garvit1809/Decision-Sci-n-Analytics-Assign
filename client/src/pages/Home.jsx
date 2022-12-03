import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { BASE_URL, EventEnd } from "../utils/APIRoutes";
import { LOCALSTORAGE_USER } from "../utils/GlobalConstants";

const Section = styled.div`
  /* width: 100vw; */
  border: 1px solid red;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
`;

const CalenderSection = styled.div`
  width: 20vw;
  border: 1px solid red;
  margin-left: 2rem;
  margin-top: 2rem;
`;

const DailySchedule = styled.div`
  width: 60vw;
  /* border: 1px solid blue; */
  margin-top: 4rem;
  margin-left: 5rem;
  margin-bottom: 2rem;
`;

const HourContainer = styled.div`
  height: 2.3rem;
  width: 100%;
  border-top: 1px solid grey;
  /* margin-bottom: 0.5rem; */
  /* border-bottom: 1px solid red; */
  /* background-color: grey; */
  position: relative;

  display: flex;
  align-items: center;

  p {
    border: 1px solid red;
  }

  /* &:nth-last-child(1){
  background-color: red;
} */

  &::before {
    content: ${(props) => `"${props.time}"`};
    font-size: 0.8rem;
    color: grey;
    /* content: '1AM'; */
    position: absolute;
    left: -1.5rem;
    top: -0.6rem;
  }
`;

const Create = styled.div``;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [convertedDate, setConvertedDate] = useState("");

  const [createEvent, setCreateEvent] = useState({
    eventName: "",
    eventDescription: "",
    startTime: "",
    endTIme: "",
  });

  const [currentUser, setCurrentUser] = useState();

  //  modal props
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (startTime, endTime) => {
    setEventStartTime(startTime);
    setEventEndTime(endTime);
    setCreateEvent({ ...createEvent, startTime: startTime, endTime: endTime });
    setOpen(true);
  };

  const [todaysEvents, setTodaysEvents] = useState()

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const getMongoReadableTime = (time) => {};

  useEffect(() => {
    console.log(currentUser);
    const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    console.log(date);
    const convertedDate = convert(date);
    console.log(convertedDate);
    setConvertedDate(convertedDate);
  }, [date]);

  useEffect(() => {
    async function getEventsByDay() {
      if (currentUser) {
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        };
        const { data } = await axios.get(
          `${BASE_URL}${EventEnd}/day/${convertedDate}`,
          config
        );
        console.log(data.events);
        setTodaysEvents(data.events)
      }
    }
    getEventsByDay();
  }, [convertedDate]);

  useEffect(() => {
    function getMonthFromString(mon) {
      return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
    }
    const date = getMonthFromString("dec");
    console.log(date);
  }, []);

  const addEventHandler = (id) => {
    //  grab elements
    // create child p --> event name

    const hourDiv = document.getElementById(`${id}`);

    let p = document.createElement("p");
    p.textContent = "This is my new event";

    hourDiv.appendChild(p);
  };

  const divCont = [];

  for (let am = 0; am < 2; am++) {
    if (am === 0) {
      for (let time = 0; time < 13; time++) {
        if (time === 12) {
          divCont.push(
            <HourContainer
              onClick={() => handleOpen(`${time} AM`, "1 PM")}
              id={`${time}AM`}
              time={`${time} AM`}
            ></HourContainer>
          );
        } else {
          // divCont.push(<HourContainer onClick={() => addEventHandler(`${time}AM`)} id={`${time}AM`} time={`${time} AM`}></HourContainer>);
          divCont.push(
            <HourContainer
              onClick={() => handleOpen(`${time} AM`, `${time + 1} AM`)}
              id={`${time}AM`}
              time={`${time} AM`}
            ></HourContainer>
          );
        }
      }
    }
    if (am === 1) {
      for (let time = 1; time < 12; time++) {
        divCont.push(
          <HourContainer
            onClick={() => handleOpen(`${time} PM`, `${time + 1} PM`)}
            id={`${time}PM`}
            time={`${time} PM`}
          ></HourContainer>
        );
      }
    }
  }

  // if (todaysEvents) {
    
  // }

  const handleChange = (e) => {
    setCreateEvent({ ...createEvent, [e.target.name]: e.target.value });
  };

  const eventHandler = (e) => {
    e.preventDefault();
    console.log(createEvent);
  };

  return (
    <Section>
      <CalenderSection>
        <Create>
          <button>Create</button>
        </Create>
        <Calendar onChange={setDate} value={date} />
      </CalenderSection>
      <DailySchedule>{divCont}</DailySchedule>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Create Event
          </Typography>
          <form onSubmit={eventHandler}>
            <input
              type="text"
              name="eventName"
              value={createEvent.eventName}
              onChange={(e) => handleChange(e)}
            />
            <textarea
              name="eventDescription"
              placeholder="Event Description"
              value={createEvent.eventDescription}
              onChange={handleChange}
            ></textarea>
            <div>
              {eventStartTime} -- {eventEndTime}
            </div>
            <button type="submit">Create</button>
          </form>
        </Box>
      </Modal>
    </Section>
  );
};

export default Home;

// {
//   dailyArr.map((hour,index) => {
//     return (
//       <HourContainer time={hour.time} key={index} onClick={() => alert(hour.time)} >
//       {
//         hour.eventName && <p>{hour.eventName}</p>
//       }
//       </HourContainer>
//     )
//   })
// }

// 1) Create an event
// 2) get all events of user
// 3) get events by dat
// 4) map events
