import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateReview = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    StudentID: "",
    Name: "",
    ClassName: "",
    Discription: "",
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/students/" + id)
      .then((response) => setStudent(response.data));
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
    swal("Reviw update success")
    console.log(student);
  };

  const haddlesubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3000/api/students/" + id, student).then(() => {
      setStudent({
        noticeID: "",
        topic: "",
        description: "",
        course: "",
        grade: "",
      });
    });
    navigate("/");
  };

  return (
    <div>
      <h2>Review Form</h2>
      <form action="#" method="POST" onSubmit={haddlesubmit}>
        <div>
          <label htmlFor="StudentID">Student ID:</label>
          <input
            type="text"
            id="StudentID"
            name="StudentID"
            onChange={handlechange}
            value={student.noticeID}
            required
          />
        </div>
        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            onChange={handlechange}
            value={student.topic}
            required
          />
        </div>
        <div>
          <label htmlFor="Discription">Description:</label>
          <textarea
            id="Discription"
            name="Discription"
            onChange={handlechange}
            value={student.Discription}
            required
          />
        </div>
        <div>
          <label htmlFor="ClassName">ClassName:</label>
          <input
            
            type="text"
            id="course"
            name="course"
            onChange={handlechange}
            value={student.ClassName}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateReview;
