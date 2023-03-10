import React from 'react'
import CardCourses from './componentsAdmin/CardCourses'
import HeaderDashboard from './componentsAdmin/HeaderDashboard'
import MasterLayoutAdmin from './MasterLayoutAdmin';
import "./admin.css"

export default function CoursesManager() {
  return (
    <>
      <MasterLayoutAdmin>
        <HeaderDashboard />
        <div className='wrap_courses_dashboard'>
          <CardCourses />
          <CardCourses />
          <CardCourses />
          <CardCourses />
          <CardCourses />
          <CardCourses />
          <CardCourses />
        </div>
      </MasterLayoutAdmin>
    </>
  )
}
