import { useState } from "react";
import "./InsertStudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InsertStudent = () => {
  const navigate = useNavigate();
  //manage state
  const [studentData, setstudents] = useState({
    StudentID: "",
    Name: "",
    ClassName: "",
    Discription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstudents({
      ...studentData,
      [name]: value,
    });
    console.log(setstudents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/students/", studentData).then(() => {
      setstudents({
        StudentID: "",
        Name: "",
        ClassName: "",
        Discription: "",
      });
      swal("Review added Successfuly!");
    });
    navigate("/");
  };

  return (
    <div>
      <h2>Review Form</h2>

      <form action="#" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="StudentID">Student ID:</label>
          <input
            type="text"
            id="StudentID"
            name="StudentID"
            onChange={handleChange}
            value={studentData.StudentID}
            required

          />
        </div>

        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            onChange={handleChange}
            value={studentData.Name}
            required

          />
        </div>
        <div>
          <label htmlFor="ClassName">ClassName:</label>
          <input
            type="text"
            id="ClassName"
            name="ClassName"
            onChange={handleChange}
            value={studentData.ClassName}
            required

          />
        </div>
        <div>
          <label htmlFor="Discription">Discription:</label>
          <input
            type="text"
            id="Discription"
            name="Discription"
            onChange={handleChange}
            value={studentData.Discription}
            required

          />
        </div>
        <div>
          <button className="btn btn-info " type="Add Student">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertStudent;
