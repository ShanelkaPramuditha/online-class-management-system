import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherForm() {
  let navigate = useNavigate();

  const [Data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Des: "",
    Tid: "",
    Pid: "",
    Plink: "",
    Time: "",
    Sdate: "",
    Edate: "",
  });

  const { Des, Tid, Pid, Plink, Time, Price, Sdate, Edate } = formData;

  useEffect(() => {
    function UpdateData() {
      const url = "http://localhost:3000/papers";
      const config = {
        headers: {
          "x-apikey": "API_KEY",
        },
        dataType: "json",
      }
  
      axios.get(url, config).then((response) => {
        setData(response.data.response);
      })
    }

    UpdateData();  
  },[])

  function Delete(key) {
    const Pid = Data[key].Pid;
    const url = "http://localhost:3000/deletepaper";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };
    const payload = {
      Pid,
    };
    axios
      .post(url, payload, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
      useNavigate('/')
  }



  const addItem = () => {
    const url = "http://localhost:3000/createPaper";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };
    const payload = {
      Des,
      Tid,
      Pid,
      Plink,
      Time,
      Sdate,
      Edate,
    };
    console.log(payload);
    axios
      .post(url, payload, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
      useNavigate('/')
  };

  const UpdatePaper = (_id) => {
    const updatelink = `update/${_id}`;
    navigate(updatelink);
  };

  const onChange = (e) => {
    setFormData((prevformData) => ({
      ...prevformData,
      [e.target.name]: e.target.value,
    }));
  };

  const RowGen = () => {
    return Data.map((Paper, index) => (
      <tr className="py-4" key={index}>
        <td className="px-4 border-2 border-black">{Paper.Des}</td>
        <td className="px-4 border-2 border-black">{Paper.Tid}</td>
        <td className="px-4 border-2 border-black">{Paper.Pid}</td>
        <td className="px-4 border-2 border-black">{Paper.Plink}</td>
        <td className="px-4 border-2 border-black">{Paper.Time}</td>
        <td className="px-4 border-2 border-black">{Paper.Sdate}</td>
        <td className="px-4 border-2 border-black">{Paper.Edate}</td>
        <td className="px-4 border-2 border-black">
          <button
            type="button"
            className="m-2 block bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4
                    rounded-full focus:outline-none focus:shadow-outline-blue active:bg-red-900"
            onClick={() => {
              UpdatePaper(Paper._id)
            }}
          >
            Edit Paper {Paper.Pid}
          </button>
          <button
            type="button"
            className="m-2 block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4
                    rounded-full focus:outline-none focus:shadow-outline-blue active:bg-red-900"
            onClick={() => Delete(index)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div 
        
        className="flex items-center justify-center min-h-screen ">
        <div>
          <div className=" bg-gradient-to-br from-green-400 to-purple-400 min-h-52 min-w-32 border-spacing-4 flex items-center justify-center flex-col">
            <div className="text-4xl font-bold mt-3 underline text-yellow-700">
              ADD PAPER TO SYSTEM{" "}
            </div>
            <div className="flex flex-col items-center justify-center border m-4 w-[800px] rounded-xl border-seperate">
              <div className=" mt-12 m-2 flex flex-col justify-center items-center">
                <label className=" text-black text-3xl mb-0 font-serif">
                  Description
                </label>
                <input
                  onChange={onChange}
                  value={Des}
                  name="Des"
                  placeholder="Enter Description Here"
                  className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border rounded w-[350px] text-xl text-center p-2"
                  type="text"
                />
                <br />
                <br />
                <label className=" text-black text-3xl mb-0 font-serif">
                  Teacher ID
                </label>
                <input
                  onChange={onChange}
                  value={Tid}
                  name="Tid"
                  placeholder="Enter your ID Here"
                  className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border rounded w-[350px] text-xl text-center p-2"
                  type="number"
                />
                <br />
                <br />

                <label className="text-black text-3xl mb-0 font-serif">
                  Paper ID{" "}
                </label>
                <input
                  onChange={onChange}
                  value={Pid}
                  name="Pid"
                  placeholder="Enter Paper ID Here"
                  className=" border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border rounded w-[350px] text-xl text-center p-2"
                  type="text"
                />

                <br />
                <br />
                <label className="text-black text-3xl mb-0 font-serif">
                  Paper Link
                </label>
                <input
                  onChange={onChange}
                  value={Plink}
                  name="Plink"
                  placeholder="Enter Paper link Here"
                  className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border rounded w-[350px] text-xl text-center p-2"
                  type="file"
                />
                <br />
                <br />
                <label className="text-black text-3xl mb-0 font-serif">
                  Time
                </label>
                <input
                  onChange={onChange}
                  value={Time}
                  name="Time"
                  placeholder="Enter time Here"
                  className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border rounded w-[350px] text-xl text-center p-2"
                  type="text"
                />
                <br />
                <br />
                
                
                <label className="text-black text-3xl mb-0 font-serif">
                  Starting Date
                </label>
                <input
                  onChange={onChange}
                  value={Sdate}
                  name="Sdate"
                  placeholder="Enter start date Here"
                  className="border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border rounded w-[350px] text-xl text-center p-2"
                  type="text"
                />
                <br />
                <br />
                <label className="text-black text-3xl mb-0 font-serif">
                  Ending Date
                </label>
                <input
                  onChange={onChange}
                  value={Edate}
                  name="Edate"
                  placeholder="Enter end date Here"
                  className=" border-slate-600 placeholder-zinc-950 bg-black bg-opacity-0 pb-3 border rounded w-[350px] text-xl text-center p-2"
                  type="text"
                />
                <br />
                <br />
              </div>
              <div className="flex text-center justify-center content-center">
                <div className="flex w-4 bg-opacity-0"></div>
                <div className="mb-5 flex w-44 h-14 max-w-sm  bg-gradient-to-tr from-blue-300 to-blue-600 rounded-xl p-0.5 shadow-lg">
                  <button
                    className="flex-1 w-44 h-14 font-bold text-xl bg-white 
                bg-opacity-45 px-6 py-3 rounded-xl "
                    onClick={addItem}
                  >
                    Add To List
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-opacity-60 backdrop-blur-sm  backdrop-brightness-200  backdrop-contrast-50 bg-white opacity-85 rounded-md m-4 p-4">
              <div className="bg-opacity-60 backdrop-blur-sm  backdrop-brightness-200  backdrop-contrast-50 bg-white opacity-85 rounded-md m-4 p-4">
                <table className="text-3xl backdrop-blur-lg ">
                  <thead>
                    <tr className="">
                      <th className="px-4 border-2 border-black ">
                        Description
                      </th>
                      <th className="px-4 border-2 border-black ">
                        Teacher ID
                      </th>
                      <th className="px-4 border-2 border-black">Paper ID</th>
                      <th className="px-4 border-2 border-black">Link</th>
                      <th className="px-4 border-2 border-black">Time</th>
                      <th className="px-4 border-2 border-black">Start Date</th>
                      <th className="px-4 border-2 border-black">
                        Ending Date
                      </th>
                      <th className="px-4 border-2 border-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <RowGen />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherForm;
