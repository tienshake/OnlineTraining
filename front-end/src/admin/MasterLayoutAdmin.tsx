import React from "react";
import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { ImUserTie } from "react-icons/im";
import { MdVideoLabel } from "react-icons/md";
import "./admin.css";
import HeaderDashboard from "./componentsAdmin/HeaderDashboard";

interface MasterLayoutAdminProps {
  children: React.ReactNode;
}

export default function MasterLayoutAdmin({
  children,
}: MasterLayoutAdminProps) {
  return (
    <>
      <div className="layout_admin">
        <div className="wrapp_menu_dashboard">
          <div
            className="menu_dashboard"
            style={{ background: "", color: "#fff" }}
          >
            <ul className="group_logo-name_admin">
              <li>
                <p className="logo"></p>
              </li>
              <li>
                <p className="name">Admin</p>
              </li>
            </ul>

            <ul
              className="list_nemu_dashboard"
              style={{ padding: 0, marginTop: "20px" }}
            >
              <Link to="/admin">
                <li>
                  <AiTwotoneHome />
                  <p>Dashboard</p>
                </li>
              </Link>

              {/* <Link to="/admin/student">
                <li>
                  <RiUser2Fill />
                  <p>Students</p>
                </li>
              </Link> */}

              <Link to="/admin/users">
                <li>
                  <ImUserTie />
                  <p>Users</p>
                </li>
              </Link>

              <Link to="/admin/courses">
                <li>
                  <MdVideoLabel />
                  <p> Courses</p>
                </li>
              </Link>

              <Link to="/admin/category">
                <li>
                  <MdVideoLabel />
                  <p> category</p>
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="wrap_content_admin">
          <HeaderDashboard />
          {children}
        </div>
      </div>
    </>
  );
}
