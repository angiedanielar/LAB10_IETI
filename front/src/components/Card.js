import React, { useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import ResponsiveDrawer from './ResponsiveDrawer';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(3),
        },
    }
}));

export const Card = ({ handleNewTask }) => {

    const classes = useStyles();

    const [openState, setOpenState] = useState(false);

    const handleOpenDialog = () => {
        setOpenState(true);
    };

    const handleCloseDialog = () => {
        setOpenState(false);
    };

    const [description, setdescription] = useState("");
    const [responsible, setresponsible] = useState("");
    const [status, setstatus] = useState("Ready");
    const [dueDate, setdueDate] = useState(new Date());
    const [file, setfile] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        let data = new FormData();
        data.append("file", file);

        if (!description.length || !responsible.length || !status.length || !dueDate)
            return;

        axios.post("http://localhost:8080/api/files", data)
            .then(response => {
                const newItem = {
                    "description": description,
                    "status": status,
                    "responsible": {
                        'name': responsible,
                        'email': localStorage.getItem("user")
                    },
                    "dueDate": dueDate.toString(),
                    "fileUrl": response.data

                };
                setitems(newItems);
                handleNewTask(newItem)
                setOpenState(false);
            }).catch(error => {
                alert("An error occurred while trying to connect to the database.");
            });

    }

    const handleInputChange = (e) => {
        setfile(e.target.files[0]);
    }

    const handleDescriptionChange = (e) => {
        setdescription(e.target.value);
    }

    const handleStatusChange = (e) => {
        setstatus(e.target.value);
    }

    const handleResposibleChange = (e) => {
        setresponsible(e.target.value);
    }

    const handleDateChange = (date) => {
        setdueDate(date);
        console.log(date)
    }

    return (
        <div>
            <div style={{ textAlign: "right", padding: "15px" }}>
                <Fab color="primary" aria-label="add" onClick={handleOpenDialog}>
                    <AddIcon />
                </Fab>
            </div>
            <Dialog open={openState} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" disableTypography>
                    <Typography variant="h3" style={{ textAlign: "center" }}>New Task</Typography>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel htmlFor="text">Description:</InputLabel>
                            <Input id="description" name="description" autoFocus onChange={handleDescriptionChange} />
                        </FormControl>
                        <br></br>
                        <br></br>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel htmlFor="number">Responsible:</InputLabel>
                            <Input id="responsible" name="responsible" autoFocus onChange={handleResposibleChange} />
                        </FormControl>
                        <br></br>
                        <br></br>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel htmlFor="age-native-simple">Status:</InputLabel>
                            <Select
                                native
                                value={status}
                                onChange={handleStatusChange}>
                                <option value="Ready">Ready</option>
                                <option value="In progress">In progress</option>
                                <option value="Done">Done</option>
                            </Select>
                        </FormControl>
                        <br></br>
                        <br></br>
                        <br></br>
                        <FormControl fullWidth margin="normal" required>
                            <DatePicker
                                id="due-date"
                                selected={dueDate}
                                placeholderText="Due date"
                                onChange={(dueDate) => handleDateChange(dueDate)}>
                            </DatePicker>
                        </FormControl>
                        <br></br>
                        <br></br>
                        <br></br>
                        <input type="file" id="file" onChange={handleInputChange} />
                        <br></br>
                        <br></br>
                        <br></br>
                        <FormControl margin="normal" required fullWidth>
                            <div className={classes.root} style={{ textAlign: "center" }}>
                                <Fab style={{ backgroundColor: "red" }} aria-label="Add" onClick={handleCloseDialog}>
                                    <CloseRoundedIcon />
                                </Fab>
                                <Fab style={{ backgroundColor: "green" }} aria-label="Cancel" onClick={handleSubmit}>
                                    <CheckRoundedIcon />
                                </Fab>
                            </div>
                        </FormControl>
                    </form>
                    <br></br>
                    <br></br>
                </DialogContent>
            </Dialog>
        </div>

    )
}

