import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "moment/locale/es";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../ui/Navbar";
import { messages } from "../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";

const localizer = momentLocalizer(moment)

moment.locale("es");

const events = [{
    title: "Cumpleaños de x persona",
    start: moment().toDate(),
    end: moment().add( 2, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "comprarle algo",
    user: {
      _id: "123",
      name: "Federico"
    }

}]

export const CalendarScreen = (e) => {

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month" );

  const onDoubleClick = (e) => {
    console.log(e)
  };
  
  const onSelectEvent = (e) => {
    console.log(e)
  };

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem("lastView", e)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white"
    }

    return {
      style
    }

  }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      view={ lastView }
      components={{
        event: CalendarEvent
      }}
      style={{ height: 500 }}
    />

        </div>
        
    )
}