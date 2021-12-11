import '../../App.css';
import React, { useState, useContext } from 'react';
import Calendarlib from 'react-calendar';
import { UserContext } from '../../hooks/UserContext';
import DatePicker from 'react-datepicker';
import { Container, Row, Col } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const userContext = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const onDate = (newDate) => {
    if (newDate !== null) {
      setDate(newDate);
    }
  };
  const temp_dates = [
    {
      date: '2021-11-14T10:30:00.000Z', //this is nov 14
      info: 'this is what your doing on nov 11'
    },
    {
      date: '2021-11-13T10:30:00.000Z',
      info: 'this is to check if i can put multiple things on one list' //this is
    },
    {
      date: '2021-11-13T10:30:00.000Z',
      info: 'this is to check if i can test put multiple things on one list' //this is
    }
  ];
  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg>
            <Calendarlib onChange={onDate} value={date} />
            <DatePicker selected={date} onChange={(date) => setDate(date)} readOnly />
          </Col>
          <Col lg>
            {temp_dates
              .filter((stored_date) => stored_date.date.substring(0, 10) === date.toISOString().substring(0, 10))
              .map((filtered_Dates) => (
                <li className="body-color">{filtered_Dates.info}</li>
              ))}
            {console.log(date.toISOString)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Calendar;
