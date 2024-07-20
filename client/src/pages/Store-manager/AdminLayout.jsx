import React from 'react';
import { Outlet } from 'react-router-dom';
import SMnav from './subComponents/SMnav';
import './adminLayout.scss'
const AdminLayout = () => {
  return (
    <div className="admin-app">
        <div className="nav">
        <SMnav />
        </div>
     
      <div className="content">
        <Outlet />
      </div>
      
    </div>
  );
};

export default AdminLayout;
