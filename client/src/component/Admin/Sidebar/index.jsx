import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { Link } from 'react-router-dom';
const menuItems = [
  { url: '/dashboard/order', name: 'অর্ডার সমুহঃ' },
  // { url: '/dashboard/order/new', name: 'নতুন অর্ডারঃ' },
  { url: '/dashboard/design', name: 'নকশাসমূহ' },
  { url: '/dashboard/design/new', name: 'নতুন নকশা' },
  { url: '/dashboard/customer', name: 'গ্রাহকসমূহ' },
  { url: '/dashboard/customer/new', name: 'নতুন গ্রাহক' },
  { url: '/dashboard/product', name: 'পণ্যসমূহ' },
  { url: '/dashboard/product/new', name: 'নতুন পণ্য' },
  { url: '/dashboard/measurement', name: 'পরিমাপ' },
  { url: '/dashboard/measurement/new', name: 'নতুন পরিমাপ' },
  { url: '/template', name: 'Template' },
  { url: '/template/new', name: 'New Template' },
  { url: '/dashboard/account', name: 'হিসাবসমূহ' },
  { url: '/dashboard/account/new', name: 'নতুন হিসাব' },
];
export default function Sidebar() {
  return (
    <Paper sx={{ width: '100%', maxWidth: '100%' }}>
      <MenuList>
        {menuItems?.map?.(({ url, name }) => (
          <MenuItem key={name}>
            <ListItemIcon>⌘</ListItemIcon>
            <ListItemText>
              <Link to={url}>{name}</Link>
            </ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}
