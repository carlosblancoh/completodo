import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeController from './controllers/HomeController';
import LoginController from './controllers/LoginController';
import RegisterController from './controllers/RegisterController';
import GroupDetailController from './controllers/GroupDetailController';
import TaskDetailController from './controllers/TaskDetailController';
import NoteDetailController from './controllers/NoteDetailController';
import BlockDetailController from './controllers/BlockDetailController';
import { useUserData } from './hooks/user';
import ArchiveController from './controllers/ArchiveController';
import TrashController from './controllers/TrashController';
import ProfileController from './controllers/ProfileController';
import CalendarController from './controllers/CalendarController';
import SearchController from './controllers/SearchController';

/**
 *
 * element={<div>{userData?.name}</div>}
 */
export default function Router(){
    const [_loading, _userData, _error] = useUserData();
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeController/>} />
                <Route path='home' element={<HomeController/>} />
                <Route path='register' element={<RegisterController/>} />
                <Route path='login' element={<LoginController/>} />
                <Route path='profile' element={<ProfileController/>} />
                <Route path='calendar' element={<CalendarController/>} />
                <Route path='calendar/:year/:month/:day' element={<CalendarController/>} />
                <Route path='search' element={<SearchController/>} />
                <Route path='group/:id' element={<GroupDetailController/>} />
                <Route path='task/:id' element={<TaskDetailController/>} />
                <Route path='note/:id' element={<NoteDetailController/>} />
                <Route path='time-block/:id' element={<BlockDetailController/>} />
                <Route path='group/:id/archive' element={<ArchiveController/>} />
                <Route path='task/:id/archive' element={<ArchiveController/>} />
                <Route path='archive' element={<ArchiveController/>} />
                <Route path='trash' element={<TrashController/>} />
            </Routes>
        </BrowserRouter>
    );
}
