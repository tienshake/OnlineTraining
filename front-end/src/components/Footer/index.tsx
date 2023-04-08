import React from "react";
// import { TextField, Button } from "@mui/material";
import styles from "./Footer.module.scss";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return <div className={styles.container}>
    <footer className="footer">
      <div className="container_footer">
        <div className="row-footer">
          <div className="footer-col">
            <img src="https://tudienwiki.com/wp-content/uploads/2017/07/lien-minh-huyen-thoai.png" width={'130px'} alt="" />
            <ul>
              <li>
                <p style={{ color: '#bbbbbb' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris</p>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>For Instructor</h4>
            <ul>
              <li>
                <Link to="sss">Profile</Link>
              </li>
              <li>
                <Link to="sss">Login</Link>
              </li>
              <li>
                <Link to="sss">Register</Link>
              </li>
              <li>
                <Link to="sss">Instructor</Link>
              </li>
              <li>
                <Link to="sss">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>For Student</h4>
            <ul>
              <li>
                <Link to="sss">Profile</Link>
              </li>
              <li>
                <Link to="sss">Login</Link>
              </li>
              <li>
                <Link to="sss">Register</Link>
              </li>
              <li>
                <Link to="sss">Instructor</Link>
              </li>
              <li>
                <Link to="sss">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>News Letter</h4>
            <div className="info-contact">
              <li>
                <input />
              </li>
              <li>
                <p>3556 Beech Street, San Francisco,
                  California, CA 94108
                </p>
              </li>
              <li>
                <p>dreamslms@example.com
                </p>
              </li>
              <li>
                <p>+19 123-456-7890
                </p>
              </li>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>;
};

export default Footer;
