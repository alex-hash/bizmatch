import React, { useState, useEffect } from 'react';
import { getProjectsInit } from '../../http/projectService';
import { Init } from '../Init';
import { useAuth } from '../../context/auth-context';

export function GetProjectsInit() {
  const [projects, setProjects] = useState(null);

  const { role } = useAuth();

  useEffect(() => {
    getProjectsInit().then((response) => setProjects(response.data));
  }, []);

  if (projects === null) {
    return (
      <div className="w-full h-full fixed block top-0 left-0 bg-background-primary opacity-75 z-50">
        <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-50">
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    );
  }

  return <Init projects={projects} role={role} />;
}
