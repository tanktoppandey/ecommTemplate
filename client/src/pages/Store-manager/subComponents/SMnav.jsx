import React from 'react'
import { Sidebar, Menu, MenuItem ,SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const SMnav = () => {
  return (
<Sidebar className='sidebar'>
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
          height:'100vh'
        },
      },
    }}
  >
    <MenuItem component={<Link to="/admin/products" />}> Products</MenuItem>
    <MenuItem component={<Link to="/admin/create" />}> Create Product</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> Analytics</MenuItem>
  </Menu>
</Sidebar>
  )
}

export default SMnav