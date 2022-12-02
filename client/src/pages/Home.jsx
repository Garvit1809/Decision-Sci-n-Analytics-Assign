import React, { useState } from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Section = styled.div`
/* width: 100vw; */
border: 1px solid red;
`

const Home = () => {
    const [value, onChange] = useState(new Date());
  return (
    <Section>
    <Calendar onChange={onChange} value={value} />
    </Section>
  )
}

export default Home