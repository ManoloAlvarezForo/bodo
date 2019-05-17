import React, { useState } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getWeekHours, getWeekData, getWeekDaysHeaderTitles, getWeekOptionsLabel } from './CalendarTools';
import CalendarEvent from './CalendarEvent';
import {GET_EVENTS_BY_DATE} from './EventQueries';
import moment from 'moment';
import { Query } from "react-apollo";

const Hours = () => {
  return (
    <Paper elevation={3} >
      <GridList
        style={{ padding: '3px 5px', maxWidth: '40px' }}
        cellHeight={10}
        cols={1}>
        {
          getWeekHours().map((value, index) => {
            return (
              <GridListTile
                key={index}
                cols={1}
                style={{ height: '60px', borderBottom: '0.5px dotted #676666' }}
                onClick={() => alert('pressed')}
              >
                <Typography style={{ margin: 0, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="body2" gutterBottom>
                  {value}
                </Typography>
              </GridListTile>
            )
          })
        }
      </GridList>
    </Paper>
  )
}

const WeekDaysHeader = ({week}) => {
  return (
    <Paper elevation={1}>
      <GridList
        style={{ padding: '3px 5px' }}
        cellHeight={10}
        cols={7}>
        {
          getWeekDaysHeaderTitles(week).map((value, index) => {
            return (
              <GridListTile
                key={index}
                cols={1}
                style={{
                  height: '35px',
                  zIndex: '0',
                  borderRight: '0.5px dotted #676666'
                }}
                onClick={() => alert('pressed')}
              >
                <Typography
                  style={{
                    margin: 0,
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  variant="body2"
                  gutterBottom>
                  {value}
                </Typography>
              </GridListTile>
            )
          })
        }
      </GridList>
    </Paper>
  )
}

// // TODO: verify if the event list is empty or there is an exception to load.
// /**
//  * Gets the Events by a Date.
//  * 
//  * @param {Object[]} events Event list.
//  * @param {Object} date Date to be filtered. 
//  * @param {Func} onLeave Event when the component is on leave.
//  * @param {Func} onOver Event when the component is over. 
//  * @param {Func} eventClick Event when the component is clicked.
//  */
// const getEventsByDate = (events, cell, onLeave, onOver, eventClick) => {
//   return events.filter(e => e.date === date).map(eventDate => {
//       return eventDate.events.map((calendarEvent, index) => {
//           return (
//               <CalendarEvent 
//                   key={index}
//                   onLeave={onLeave}
//                   onOver={onOver}
//                   calendarEvent={calendarEvent}
//                   eventClick={eventClick}
//               />
//           )
//       })
//   })
// }

const getEventsByDate = (events, cell, onLeave, onOver, eventClick) => {
  // return events.filter(e => e.date === date).map(eventDate => {
  //     return eventDate.events.map((calendarEvent, index) => {
  //         return (
  //             <CalendarEvent 
  //                 key={index}
  //                 onLeave={onLeave}
  //                 onOver={onOver}
  //                 calendarEvent={calendarEvent}
  //                 eventClick={eventClick}
  //             />
  //         )
  //     })
  // })
}

// TO add border right
// , borderRight:'0.5px dotted #676666'
const WeekDays = ({startDate, endDate, events}) => {
  return (
    <GridList
      style={{ padding: '3px 5px' }}
      cellHeight={10}
      cols={7}>
      {
        getWeekData(startDate, endDate).map((cell, index) => {
          return (
            <GridListTile
              className="tile-calendar"
              key={index}
              cols={1}
              style={{ borderBottom: '0.5px dotted #676666', height: '60px', borderRight:'0.5px dotted #676666' }}
              onClick={() => alert('pressed')}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {
                  getEventsByDate(events, startDate, endDate, cell)
                }
              </div>
            </GridListTile>
          )
        })
      }
    </GridList>
  )
}

const WeekDaysContent = ({initStartDate, initEndDate, year, locale}) => {
  const from = initStartDate.format('YYYY-MM-DD');
  const to = initEndDate.format('YYYY-MM-DD');
  return <Query query={GET_EVENTS_BY_DATE}
  variables={{ from, to}}
  skip={from === "" && to === "" && locale === "" && year === ""}
  fetchPolicy="cache-and-network">
  {({ loading, error, data }) => {
      if (loading) return <div></div>
      if (error) {
          return <div>{`Message [${error}]`}</div>
      }

      return (
          <WeekDays
              events={data.eventsByDate}
              startDate={initStartDate}
              endDate={initEndDate}
              // setOpenNewEventDialog={setOpenNewEventDialog}
              // setOpenDetailEventDialog={setOpenDetailEventDialog}
              // setSelectedCalendarEvent={setSelectedCalendarEvent}
              // setSelectedDate={setSelectedDate}
          />
      )
  }}
</Query>
}

const WeekCalendar = ({ data, classes, dialogForm: DialogForm, dialogContent: AddEventComponent }) => {
  const {startDate, endDate} = getWeekOptionsLabel(data);
  const [week, setWeek] = useState(data.get('week'));
  const [year, setYear] = useState(data.get('year'));
  const [selectedDate, setSelectedDate] = useState(moment());
  const [locale] = useState(moment().locale());
  const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
  const [openDetaiEventlDialog, setOpenDetailEventDialog] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState({});

  const initDataModel = {
    title: '',
    date: '',
    timeFrom: '',
    timeTo: '',
    participants: [],
    description: ''
  }
  // useEffect(() => {
  //   setMonth(data.get('month'));
  // }, [data])

  return (
    <Paper elevation={1} style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginLeft: '35px', marginRight: '7px', paddingTop: '2px' }}>
          <WeekDaysHeader week={data} />
        </div>
        <div style={styles.weekDaysContent}>
          <div style={{ height: 'calc(100vh - 145px)' }}>
            <Hours />
          </div>
          <div style={{ width: '100%' }}>
            <WeekDaysContent initStartDate={startDate} initEndDate={endDate} year={year.toString()} locale={locale} />
          </div>
        </div>
      </div>
    </Paper>
  )
}

const styles = {
  weekDaysContent: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'calc(100vh - 145px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    marginTop: '5px'
  }
}

export default WeekCalendar;