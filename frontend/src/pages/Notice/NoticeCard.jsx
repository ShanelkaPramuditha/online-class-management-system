import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const NoticeCard = ({notice}) => {
  const navigate = useNavigate();
  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/notices/${notice._id}`);
      console.log(response);
      window.location.href = '/'
      
    } catch (error) {
      console.error(error)
    }
    swal("Deleted Succefull!");
  };

  const handleUpdate = async (_id) => {
    navigate("/update/" + _id)
   /* try {
      const response = await axios.put(`http://localhost:3000/api/notices/${notice._id}`);
      console.log(response);
      window.location.href = '/'
      
    } catch (error) {
      console.error(error)
    }
    swal("Welcome to notice page!");*/
  };
  


  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="50"
          image="https://st2.depositphotos.com/1186248/11327/i/950/depositphotos_113276844-stock-photo-important-notice-rubber-stamp.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {notice.topic}
          </Typography>
          <br/>
          <Typography gutterBottom variant="h10" component="div">
            {notice.noticeID}
            <br/>
            {notice.course}
            <br/>
            {notice.grade}
            <br/>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {notice.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary"onClick={(() => (handleDelete(notice._id)))}>
          Delete
        </Button>
        <Button size="small" color="primary">
          Read
        </Button>
        <Button size="small" color="primary"onClick={(() => (handleUpdate(notice._id)))}>
          Update
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default NoticeCard;

