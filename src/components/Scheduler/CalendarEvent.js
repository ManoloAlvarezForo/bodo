import React from 'react';

const CalendarEvent = ({ onLeave, onOver, calendarEvent, eventClick }) => {
    return (
        <div className="event-calendar" style={styles.mainContainer} >
            <div
                style={styles.eventStyle}
                onMouseLeave={onLeave}
                onMouseOver={onOver}
                onClick={e => eventClick(e, calendarEvent)}
            >
                {`${calendarEvent.timeFrom} - ${calendarEvent.title}`}
            </div>
        </div>
    )
}

const styles = {
    mainContainer: {
        borderRadius: '3px'
    },
    eventStyle: {
        zIndex: '2',
        margin: '2px 3px',
        fontSize: '14px',
        color: 'white'
    }
}

export default CalendarEvent;