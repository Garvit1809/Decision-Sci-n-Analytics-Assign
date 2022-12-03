import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";

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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 0,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const Home = () => {
  const [value, onChange] = useState(new Date());
  const [eventStartTime, setEventStartTime] = useState('')
  const [eventEndTime, setEventEndTime] = useState('')

  //  modal props
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen = (startTime, endTime) => {
    setEventStartTime(startTime)
    setEventEndTime(endTime)
    setOpen(true);
  }

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  useEffect(() => {
    function getMonthFromString(mon){
      return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
   }
   const date = getMonthFromString('dec')
   console.log(date);
  }, [])
  

  const addEventHandler = (id) => {
    //  grab elements
    // create child p --> event name

    const hourDiv = document.getElementById(`${id}`);

    let p = document.createElement('p');
    p.textContent = 'This is my new event';

    hourDiv.appendChild(p)
  }

  const divCont = [];

  for (let am = 0; am < 2; am++) {
    if (am === 0) {
      for (let time = 0; time < 13; time++) {
        if ( time === 12 ) {
          divCont.push(<HourContainer onClick={() => handleOpen(`${time} AM`, '1 PM')} id={`${time}AM`} time={`${time} AM`}></HourContainer>);
        } else {
          // divCont.push(<HourContainer onClick={() => addEventHandler(`${time}AM`)} id={`${time}AM`} time={`${time} AM`}></HourContainer>);
          divCont.push(<HourContainer onClick={() => handleOpen(`${time} AM`, `${time + 1} AM`)} id={`${time}AM`} time={`${time} AM`}></HourContainer>);
        }
      }
    }
    if (am === 1) {
      for (let time = 1; time < 12; time++) {
        divCont.push(<HourContainer onClick={() => handleOpen(`${time} PM`, `${time + 1} PM`)} id={`${time}PM`}  time={`${time} PM`}></HourContainer>);
      }
    }
  }

  return (
    <Section>
      <CalenderSection>
        <Create>
          <button>Create</button>
        </Create>
        <Calendar onChange={onChange} value={value} />
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
          <TextField id="standard-basic" label="Event Name" variant="standard" />
          <textarea name="" id="" cols="30" rows="10" placeholder="Event Description" ></textarea>
          <TextField
          id="filled-read-only-input"
          defaultValue={eventStartTime}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
          <TextField
          id="filled-read-only-input"
          defaultValue={eventEndTime}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
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
