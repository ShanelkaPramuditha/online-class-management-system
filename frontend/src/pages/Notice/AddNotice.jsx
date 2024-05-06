import { useState } from 'react';
//import './AddNotice.css'; // This line can be removed since we're not using CSS file anymore
import axios from 'axios';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddNotice = () => {
    const navigate = useNavigate();

    const [noticeData, setNotices] = useState({
        topic: '',
        description: '',
        course: '',
        grade: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setNotices({
            ...noticeData,
            [name]: value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (validateForm()) {
            console.log(noticeData);
            await axios
                .post('http://localhost:5000/api/notices', noticeData)
                .then(() => {
                    swal.fire('Notice added successfully!');
                    navigate('/notices/');
                })
                .catch(error => {
                    console.error('Error adding notice:', error);
                    swal.fire(
                        'Oops!',
                        'Something went wrong. Please try again later.',
                        'error'
                    );
                });
        }
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!noticeData.topic) {
            formIsValid = false;
            errors['topic'] = 'Please enter Topic';
        }

        if (!noticeData.description) {
            formIsValid = false;
            errors['description'] = 'Please enter Description';
        }

        if (!noticeData.course) {
            formIsValid = false;
            errors['course'] = 'Please enter Course';
        }

        if (!noticeData.grade) {
            formIsValid = false;
            errors['grade'] = 'Please enter Grade';
        }

        setErrors(errors);
        return formIsValid;
    };

    return (
        <div>
            <h2 className="text-center font-bold text-2xl">Notice Form</h2>
            <form onSubmit={handleSubmit} noValidate className="max-w-[500px] mx-auto p-20 border border-gray-300 rounded ">
                <div>
                    <label htmlFor="topic" className="font-bold block mb-5">Topic:</label>
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        onChange={handleChange}
                        value={noticeData.topic}
                        required
                        className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
                    />
                    <div className="error">{errors['topic']}</div>
                </div>
                <div>
                    <label htmlFor="description" className="font-bold block mb-5">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={handleChange}
                        value={noticeData.description}
                        required
                        className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
                    />
                    <div className="error">{errors['description']}</div>
                </div>
                <div>
                    <label htmlFor="course" className="font-bold block mb-5">Course:</label>
                    <input
                        type="text"
                        id="course"
                        name="course"
                        onChange={handleChange}
                        value={noticeData.course}
                        required
                        className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
                    />
                    <div className="error">{errors['course']}</div>
                </div>
                <div>
                    <label htmlFor="grade" className="font-bold block mb-5">Grade:</label>
                    <input
                        type="text"
                        id="grade"
                        name="grade"
                        onChange={handleChange}
                        value={noticeData.grade}
                        required
                        className="w-full px-4 py-2 mb-10 border border-gray-300 rounded"
                    />
                    <div className="error">{errors['grade']}</div>
                </div>
                <button type="submit" className="bg-[green] text-{white] px-10 py-2 rounded cursor-pointer">Submit</button>
            </form>
        </div>
    );
};

export default AddNotice;
