"use client";
import React, { useState } from 'react'
import { AuthContextProvider } from '../context/authContext';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LinkOutlined,
  UserOutlined,
  HomeOutlined,
  MailOutlined,
  DownloadOutlined,
  AccountBookOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';

const { Header, Sider, Content } = Layout;

const LayoutProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const isUserLoggedIn = true;



  //toggle bar
  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  }


  return (
    <html lang="en">
      <body >
        {/*             
              <Navbar /> */}



        


        {children}



      </body>
    </html>
  );
}

export default LayoutProvider