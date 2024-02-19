import './Calendar.css';
import React, { useState, useEffect } from 'react'
import SimpleHeader from "../components/simpleHeader"
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" 
import frLocale from '@fullcalendar/core/locales/fr';
import { getAPI} from '../components/fetchAPI.js';
import { isExpired, decodeToken } from "react-jwt";


function CalendarPage({data}) {
    let events = [];
    var colors = ["BlueViolet", "SteelBlue", "YellowGreen", "DarkCyan", "Teal"];
    let token = decodeToken(localStorage.getItem('token'));
    data.forEach(element => { 
        if(element.length > 0){
            let title = "titre du cours";
            if (token.roles.includes('ROLE_STUDENT')) {
                title = element[0].Cours.Instrument.Name + " " + element[0].Cours.difficulty;
            }
            else {
                title = element[0].Cours.Student.User.prenom + " " + element[0].Cours.Student.User.nom;
            }
            if(colors.length == 0){
                colors = ["BlueViolet", "SteelBlue", "YellowGreen", "DarkCyan", "Teal"];
            }
            var randomColor=colors[Math.floor(Math.random()*colors.length)];
            colors.splice(colors.indexOf(randomColor), 1);
            element.forEach(e => {
                let start = e.startAt;
                let end = e.endAt;
                events.push({title: title, start: start, end: end, color: randomColor});
            });
        }
    });


    return (
        <div className='Calendar'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                // dateClick={this.handleDateClick}
                initialView="timeGridWeek"
                locale={frLocale}
                firstDay={1}
                allDaySlot={false}
                slotMinTime='07:00:00'
                slotMaxTime='21:00:00'
                scrollTime='08:00:00'
                titleFormat={{ year: 'numeric', month: 'short', day:'numeric' }  }
                events={events}
                headerToolbar={{
                    left: 'title dayGridMonth,timeGridWeek,timeGridDay',
                    right: 'today prev,next'
                }}
            />
        </div>
    );
}

export default function Calendar() {
    const [seances, setSeances] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            await getAPI("user-seances", setSeances);
        };
        fetchData();
    }, []);

    
    
    return (
        <div>
            <SimpleHeader/>    
            <CalendarPage data={seances} />
        </div>
    );
}