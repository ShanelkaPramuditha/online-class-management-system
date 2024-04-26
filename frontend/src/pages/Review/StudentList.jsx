import { useState, useEffect } from "react";
import axios from "axios";
import StudentCard from "./StudentCard";
import "./StudentList.css";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/students")
      .then((res) => {
        setStudents(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const studentsList =
    students.length === 0
      ? "no students found !"
      : students.map((student, index) => (
          <StudentCard key={index} student={student} />
        ));

  return (
    <div className="Show_StudentList">
      <div className="container">
        <div className="list">{studentsList}</div>
      </div>
      <div className="flex m-5 ">
        <button className="btn btn-success " onClick={() => navigate("/Add")}>
          {" "}
          Add Review
        </button>
      </div>
    </div>
  );
};

export default StudentList;
