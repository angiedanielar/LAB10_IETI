import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import {Fab } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

let showFile

if (fileUrl.endsWith(".pdf")) {
  showFile = <div style={{
    margin: "auto",
    width: "50%",
    padding: "10px"
  }}>
    <a href={fileUrl}>
      <Fab
        color="primary"
        size="small"
        component="span"
        aria-label="add"
        variant="extended"
      >
        <PictureAsPdfIcon /> View File
                </Fab>
    </a>
  </div>
}
else {
  showFile = <CardMedia
    image={fileUrl}
    title={description} />
}

export default function OutlinedCard({ description, responsible, status, dueDate, fileUrl }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      {showFile}
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="h5" component="h2">
          {responsible.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {status}
        </Typography>
        <Typography variant="body2" component="p">
          {new Date(dueDate).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}