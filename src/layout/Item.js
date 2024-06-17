import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../components/icon';

const Item = ({ title, icon, submenu, color, page }) => {
  const [listMenu, setListMenu] = useState(false);

  const handleClick = () => {
    setListMenu(!listMenu);
  };

  return (
    <>
      {page ? (
        <NavLink to={page} end>
          {({ isActive }) => (
            <ListItemButton selected={isActive}>
              <ListItemIcon>
                <Icon size="30px">{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          )}
        </NavLink>
      ) : (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Icon size="30px">{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={title} />
            {listMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* <Collapse in={listMenu}>
            <List component="div" disablePadding className="">
              {!!submenu &&
                submenu.map(({ page, icon, title, submenu }, idx) => (
                  <SubMenu
                    title={title}
                    icon={icon}
                    color={color}
                    key={idx}
                    page={page}
                    submenu={submenu}
                    onMenu={setListMenu}
                  />
                ))}
            </List>
          </Collapse> */}
        </>
      )}
    </>
  );
};

export default Item;
