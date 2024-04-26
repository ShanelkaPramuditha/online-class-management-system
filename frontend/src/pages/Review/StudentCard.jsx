import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const StudentCard = ({ student }) => {
  
  const navigate = useNavigate();
  const handleDelete = async(idd) => {
      await axios.delete(`http://localhost:3000/api/students/` + idd)
      .then((response)=>{console.log(response)})
      .catch((error) => console.error(error))
      window.location.href = '/'
  };

  const handleUpdate = async(id) => {
    navigate("/update/" + id)
  }
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://previews.123rf.com/images/kchung/kchung1401/kchung140100422/25024688-3d-person-watching-a-word-review-with-a-magnifying-glass.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {student.StudentID}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.Name}
            <br />
            {student.ClassName}
            <br />
            {student.Discription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary"onClick={(()=>(handleDelete(student._id)))}>
          Delete
        </Button>
        <Button size="small" color="primary"onClick={(()=>(handleUpdate(student._id)))}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
};

export default StudentCard;
