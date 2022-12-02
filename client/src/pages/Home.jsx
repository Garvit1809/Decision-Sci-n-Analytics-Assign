import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

  /* &:nth-last-child(25){
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

const dailyArr = [
  {
    time: "0 AM",
    // eventName: 'Lollll'
  },
  {
    time: "1 AM",
    event: false,
  },
  {
    time: "2 AM",
    event: false,
  },
  {
    time: "3 AM",
    event: false,
  },
  {
    time: "4 AM",
    event: false,
  },
  {
    time: "5 AM",
    event: false,
  },
  {
    time: "6 AM",
    event: false,
  },
  {
    time: "7 AM",
    event: false,
  },
  {
    time: "8 AM",
    event: false,
  },
  {
    time: "9 AM",
    event: false,
  },
  {
    time: "10 AM",
    event: false,
  },
  {
    time: "11 AM",
    event: false,
  },
  {
    time: "12 AM",
    event: false,
  },
  {
    time: "1 pM",
    event: false,
  },
  {
    time: "2 PM",
    event: false,
  },
  {
    time: "3 PM",
    event: false,
  },
  {
    time: "4 PM",
    event: false,
  },
  {
    time: "5 PM",
    event: false,
  },
  {
    time: "6 PM",
  },
  {
    time: "7 PM",
  },
  {
    time: "8 PM",
  },
  {
    time: "9 PM",
  },
  {
    time: "10 PM",
  },
  {
    time: "11 PM",
  },
  {
    time: "12 PM",
  },
];

const Home = () => {
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    console.log(value);
  }, [value]);

  const divCont = [];

  for (let am = 0; am < 2; am++) {
    if (am === 0) {
      for (let time = 0; time < 13; time++) {
        divCont.push(<HourContainer onClick={() => alert(time + ' AM')}  time={`${time} AM`}></HourContainer>);
      }
    }
    if (am === 1) {
      for (let time = 1; time < 13; time++) {
        divCont.push(<HourContainer onClick={() => alert(time + ' PM')} time={`${time} PM`}></HourContainer>);
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
