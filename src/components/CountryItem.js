import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import ReactCountryFlag from "react-country-flag"
import ReactPlayer from 'react-player'
import ReorderIcon from '@mui/icons-material/Reorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

const Item = props => {
  const { provided, item, index } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <ListItemIcon>
          <ReorderIcon />
        </ListItemIcon>
        <ListItemAvatar sx={{ minWidth: 35 }}>
          {index + 1}
        </ListItemAvatar>
        <ListItemAvatar>
          <ReactCountryFlag countryCode={item.country_code} svg style={{ width: '2em', height: '2em' }} />
        </ListItemAvatar>
        <ListItemButton onClick={handleClick} sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <ListItemText primary={item.primary}/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ReactPlayer url={item.secondary} width='100%' controls={true} />
        </List>
      </Collapse>
    </List>
  )
}

const DraggableListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => <Item provided={provided} snapshot={snapshot} item={item} index={index} />}
    </Draggable>
  );
};

export default DraggableListItem;
