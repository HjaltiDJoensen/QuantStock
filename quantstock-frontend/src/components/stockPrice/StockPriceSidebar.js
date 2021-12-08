import React from 'react';
import Drawers from '../ui/Drawers'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function StockPriceSidebar(props) {
    const [addStockOpen, setAddStockOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(props.stocks);

    const handleToggle = (index) => () => {
        console.log(index)
        const currentStock = checked[index];
        const newChecked = [...checked];

        if (currentStock === -1) {
            newChecked[index] = props.stocks[index];
        } else {
            newChecked[index] = -1;
        }
        console.log(newChecked)
        setChecked(newChecked);
    };

    const handleAddStockOpen = () => {
        setAddStockOpen(!addStockOpen);
    };

    const handleAddNewStock = (newStock) => {
        if (props.stocks.includes(newStock) || newStock === null) {
            return
        } else {
            props.setStocks([...props.stocks, newStock])
            props.setTempStocks([newStock])
        }
    }

    return (
        <Drawers
            anchor={"right"}
            sidebarOpen={true}
        >
            <List>
                <ListItemButton onClick={handleAddStockOpen}>
                    <ListItemIcon>
                        <AddBusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add Stocks"} />
                    {addStockOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Divider />
                <Collapse in={addStockOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            key={"search_stock"}
                        >
                            <Autocomplete
                                // disablePortal
                                id="combo-box-demo"
                                options={props.allStocks}
                                sx={{ width: 240 }}
                                onChange={(e, v) => handleAddNewStock(v)}
                                renderInput={(params) => <TextField {...params} label="Stocks" variant="standard" />}
                            />
                        </ListItem>
                        {props.stocks.map((stock, index) => {
                            return (
                                <ListItem
                                    key={stock}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="remove">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    style={{
                                        backgroundColor: (checked[index] !== -1) ? props.color[index] : "",
                                    }}
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked[index] !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': index }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={index} primary={stock} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>
                <Divider />
            </List>
        </Drawers>
    )

}

