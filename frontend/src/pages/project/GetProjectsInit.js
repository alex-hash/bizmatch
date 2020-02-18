import React, { useState, useEffect, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProjectsInit } from '../../http/projectService';
import { Init } from '../Init';


export function GetProjectsInit() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    getProjectsInit().then((response) => setProjects(response.data));
  }, []);
  
  if(projects === null){
    return(
			<div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
				<span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-50">
					<i className="fas fa-circle-notch fa-spin fa-5x"></i>
				</span>
			</div>
		);
  }
  
  return <Init projects={projects} />;
}
