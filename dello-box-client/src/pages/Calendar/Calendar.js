import '../../App.css';
import '../../stylesheets/calendarTask.css';
import React, { useState, useContext, useEffect } from 'react';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import Calendarlib from 'react-calendar';
import { UserContext } from '../../hooks/UserContext';
import DatePicker from 'react-datepicker';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { capitalize } from '../../utils/capitalizeString';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const userContext = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState([]);

  const onDate = (newDate) => {
    if (newDate !== null) {
      setDate(newDate);
    }
  };

  const getTasks = async () => {
    const url = `/task/${userContext.user?.id}`;
    try {
      const response = await httpService.get(url);
      setTask(response.data);
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const windowScreenHeight = window.screen.height / 2;
  return (
    <Container className="container-calendar-scrolling">
      <Container fluid className="media-test" style={{ paddingTop: 70 }}>
        <Row>
          <Col lg>
            <Calendarlib onChange={onDate} value={date} />
          </Col>
          <Col lg>
            {task
              .filter((stored_date) => stored_date.start_date.substring(0, 10) <= date.toISOString().substring(0, 10) && stored_date.end_date.substring(0, 10) >= date.toISOString().substring(0, 10))
              .map((filtered_Dates) => (
                <ul className="task-look">
                  <li className="task-title">{filtered_Dates.title}</li>
                  <ul>
                    <li>{filtered_Dates.notes}</li>
                  </ul>
                </ul>
              ))}
            {console.log(date.toISOString)}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Calendar;
