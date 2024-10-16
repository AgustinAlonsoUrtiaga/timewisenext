"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAppContext } from "../../context/AppContext";
import { Menu, MenuItem, IconButton, Avatar, Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/Navbar.css";

const Navbar = () => {
  const { environment, updateEnvironment } = useAppContext();
  const isAuthenticated = true;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEnvironmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEnvironment = event.target.value;
    updateEnvironment(selectedEnvironment);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/auth";
    handleMenuClose();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Box className="navbar-content" display="flex" alignItems="center" justifyContent="space-between">
        <Link href="/" className="navbar-title">
          TimeWise
        </Link>

        <IconButton className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <MenuIcon />
        </IconButton>

        <Box className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/tasks">Tasks</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </Box>

        <Box className="navbar-right" display="flex" alignItems="center" gap={2}>
          <div className="environment-select">
            <select
              value={environment}
              onChange={handleEnvironmentChange}
              className="environment-dropdown"
            >
              <option value="SERVER 1">SERVER 1</option>
              <option value="SERVER 2">SERVER 2</option>
              <option value="SERVER 3">SERVER 3</option>
              <option value="SERVER 4">SERVER 4</option>
            </select>
          </div>
          
          {/* Icono de perfil */}
          {isAuthenticated && (
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center" color="error">Log Out</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;