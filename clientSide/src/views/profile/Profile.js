import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux"

import './Profile.css';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="Profile">
      <p>{currentUser.username}</p>
      <p>{currentUser.email}</p>
      <p>{currentUser.role}</p>
      <p>{currentUser.agencyId}</p>
      <p>{currentUser.agencyName}</p>
      <p>{currentUser.online}</p>
      <p>{currentUser.clients}</p>
    </div>
  );
};

export default Profile;
