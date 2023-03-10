import React from 'react';
import { Link } from 'react-router-dom';
import { AiTwotoneHome } from 'react-icons/ai';
import { RiUser2Fill } from 'react-icons/ri';
import { ImUserTie } from 'react-icons/im';
import { MdVideoLabel } from 'react-icons/md';
import "./admin.css"


interface MasterLayoutAdminProps {
    children: React.ReactNode
}

export default function MasterLayoutAdmin({ children }: MasterLayoutAdminProps) {
    return (
        <>
            <div className='layout_admin'>
                <div className='wrapp_menu_dashboard'>
                    <div className='menu_dashboard' style={{ background: '', color: '#fff' }}>
                        <ul className='group_logo-name_admin'>
                            <li><p className='logo'></p></li>
                            <li><p className='name'>e-Learn</p></li>
                        </ul>


                        <ul className='list_nemu_dashboard' style={{ padding: 0, marginTop: '20px' }}>
                            <Link to='/admin'>
                                <li>
                                    <AiTwotoneHome />
                                    <p>Dashboard</p>
                                </li></Link>

                            <Link to='/admin/student'>
                                <li>
                                    <RiUser2Fill />
                                    <p>
                                        Students
                                    </p>
                                </li>
                            </Link>

                            <Link to='/admin/teacher'>
                                <li>
                                    <ImUserTie />
                                    <p>Teachers</p>
                                </li>
                            </Link>

                            <Link to='/admin/courses'>
                                <li>
                                    <MdVideoLabel />
                                    <p> Courses</p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>

                <div className='wrap_content_admin'>
                    {children}
                </div>
            </div>
        </>
    )
}
