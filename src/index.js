import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FindTeachersPage from'./pages/findTeacher.js';
import Inbox from './pages/Inbox.js';
import User from './pages/User.js';
import EditUser from './pages/editUser.js';
import SearchPage from './pages/SearchPage.js';
import CoursSearch from './pages/CoursSearch.js';
import CoursPage from './pages/CoursPage.js';
import ExercicesSearch from './pages/ExercicesSearch.js';
import TeacherHome from './pages/TeacherHome.js';
import TeacherLessons from './pages/TeacherLessons.js';
import Layout from './components/layout.js';
import HomeStudent from './pages/homeStudent.js';
import {Activity} from './pages/activity.js';
import History from './pages/history.js';
import {Library} from './pages/library.js';
import PartitionReader from './pages/partitionReader.js';
import AddPartition from './pages/addPartition.js';
import Messages from './pages/Messages.js';
import EditLesson from './pages/editLesson.js'; 
import NotFound from './pages/notFound.js';
import AddLesson from './pages/addLesson.js';
import LessonsHistory from './pages/LessonsHistory.js';
import LessonsHistoryDetails from './pages/LessonsHistoryDetails.js';
import Register from './pages/register.js';
import NextVersion from './pages/nextVersion.js';
import Metronome from './pages/Metronome.js';
import Accordeur from './pages/Accordeur.js';
import DrumMachine from './pages/DrumMachine.js'
import PartEditor from './pages/partEditor.js';
import Calendar from './pages/Calendar.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ForgotPasswordVerif from './pages/ForgotPasswordVerif.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route path="findTeacher" element={<FindTeachersPage />}/>
          <Route path="inbox" element={<Inbox />}/>
          <Route path="search" element={<SearchPage />}/>
          <Route path="cours" element={<CoursSearch />}/>
          {/* <Route path="exercices" element={<ExercicesSearch />}/> */}
          <Route path="teacher/home" element={<TeacherHome />}/>
          <Route path="student/home" element={<HomeStudent/>}/>
          <Route path="library" element={<Library/>}/>
          <Route path="home" element={<Layout />}/>
        </Route>
        <Route path="/user" element={<User />}/>
        <Route path="addPartition" element={<AddPartition/>}/>
        <Route path="/user/edit" element={<EditUser />}/>
        <Route path="/cours/:coursId" element={<CoursPage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="teacher/teacherLessons/:coursId/:seanceId" element={<TeacherLessons/>} />
        <Route path="/activity/:idCourse/:idAct" element={<Activity/>}/>
        <Route path="/play/:id/:custom?" element={<PartitionReader/>}/>
        <Route path="/history/:idCourse" element={<History/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/message/:id" element={<Messages />} />
        <Route path="teacher/editLesson/:coursId/:seanceId" element={<EditLesson/>} />
        <Route path="teacher/teacherLessons/:coursId/" element={<AddLesson/>} />
        <Route path="teacher/lessonsHistory/:studentId" element={<LessonsHistory/>} />
        <Route path="teacher/lessonsHistory/:studentId/:lessonId" element={<LessonsHistoryDetails/>} />
        <Route path="/metronome" element={<Metronome/>} />
        <Route path="/accordeur" element={<Accordeur/>} />
        <Route path="/drum-machine" element={<DrumMachine/>} />
        <Route path="/nextVersion" element={<NextVersion/>} />
        <Route path='/partEditor' element={<PartEditor/>} />
        <Route path='/calendrier' element={<Calendar/>} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/:forgotPasswordToken" element={<ForgotPasswordVerif />} />

        {/* /!\ à laisser en dernier /!\*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
);

