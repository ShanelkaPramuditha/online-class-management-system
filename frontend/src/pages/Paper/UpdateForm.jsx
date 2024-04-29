import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateForm() {
  const textboxStyle =
    "placeholder-gray-450 px-4 text-slate-900 rounded-xl border-black placeholder-zinc-950 bg-black bg-opacity-50 pb-3 border-b-4 text-3xl";
  const LabelStyle = "font-bold text-xl p-4 my-4 rounded flex flex-col";
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Des: "",
    Tid: "",
    Pid: "",
    Plink: "",
    Time: "",
    Sdate: "",
    Edate: "",
  });

  const { Des, Tid, Pid, Plink, Time, Sdate, Edate } = formData;
  const [paper, setPaper] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getPaper = async () => {
      const url = "http://localhost:3000/paper";
      const config = {
        headers: {
          "x-apikey": "API_KEY",
        },
      };
      const payload = {
        id,
      };
      try {
        const resPaper = await axios.post(url, payload, config);
        setPaper(resPaper.data.response);
        setFormData({ Pid: resPaper.data.response.Pid });
        console.log(resPaper.data.response);
      } catch (err) {
        console.log(err);
      }
    };

    getPaper();
  }, [id]);

  const updateData = () => {
    const url = "http://localhost:3000/updatepaper";
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    };
    if (formData.Des) paper.Des = formData.Des;
    if (formData.Tid) paper.Tid = formData.Tid;
    if (formData.Plink) paper.Plink = formData.Plink;
    if (formData.Time) paper.Time = formData.Time;
    if (formData.Sdate) paper.Sdate = formData.Sdate;
    if (formData.Edate) paper.Edate = formData.Edate;

    const payload = {
      Des: paper.Des,
      Tid: paper.Tid,
      Pid: paper.id,
      Plink: paper.Plink,
      Time: paper.Time,
      Sdate: paper.Sdate,
      Edate: paper.Edate,
    };
    axios
      .post(url, payload, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
      navigate("/")
  };

  const onChange = (e) => {
    setFormData((prevformData) => ({
      ...prevformData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div
        className="d-flex vh-100 bg-primary justify-content-center align-items-center"
         style={{
        backgroundImage: `url('../res/bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" flex items-center justify-center min-h-screen ">
          <div>
            <div className="p-5 border-2 border-y-sky-600 border-black backdrop-blur-md rounded-xl bg-slate-150 min-h-52 min-w-32 border-spacing-4    ">
              <div className="flex">
                <div className="flex-col mt-8 m-5">
                  <label className={LabelStyle}>Description </label>

                  <label className={LabelStyle}>Teacher ID </label>

                  <label className={LabelStyle}>Paper ID </label>

                  <label className={LabelStyle}>Paper Link</label>

                  <label className={LabelStyle}>Time </label>

                   <label className={LabelStyle}>Starting Date </label>

                  <label className={LabelStyle}>Ending Date </label>
                </div>
                <div className=" mt-8 m-5 block border-black border-3">
                  <br />
                  <input
                    onChange={onChange}
                    value={Des}
                    name="Des"
                    placeholder="Enter Description Here"
                    className={textboxStyle}
                    type="text"
                  />
                  <br />
                  <br />
                  <input
                    onChange={onChange}
                    value={Tid}
                    name="Tid"
                    placeholder="Enter Teacher ID Here"
                    className={textboxStyle}
                    type="number"
                  />
                  <br />
                  <br />
                  <input
                    onChange={onChange}
                    value={Pid}
                    name="Pid"
                    disabled
                    placeholder="Enter  Paper ID Here"
                    className={textboxStyle}
                    type="text"
                  />
                  <br />
                  <br />
                  <input
                    onChange={onChange}
                    value={Plink}
                    name="Plink"
                    placeholder="Enter Paper Link Here"
                    className={textboxStyle}
                    type="file"
                  />


                  <br />
                  <br />
                  <input
                    onChange={onChange}
                    value={Time}
                    name="Time"
                    placeholder="Enter Time Here"
                    className={textboxStyle}
                    type="text"
                  />
                  <br />
                  <br />
                  
                  <input
                    onChange={onChange}
                    value={Sdate}
                    name="Sdate"
                    placeholder="Enter Starting Date Here"
                    className={textboxStyle}
                    type="text"
                  />
                  <br />
                  <br />
                  <input
                    onChange={onChange}
                    value={Edate}
                    name="Edate"
                    placeholder="Enter Ending Date Here"
                    className={textboxStyle}
                    type="text"
                  />
                  <br />
                  <br />
                </div>
              </div>
              <div className="flex text-center justify-center content-center">
                <div className="flex w-4 bg-opacity-100"></div>
                <div className="">
                  <button
                    className="bg-blue-700  flex-1 w-44 h-14 font-bold text-xl
                bg-opacity-45 px-6 py-3 rounded-full hover:bg-blue-800 hover:text-white"
                    onClick={updateData}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-opacity-60 backdrop-blur-sm backdrop-brightness-200 backdrop-contrast-50 bg-white opacity-85 rounded-md m-4 p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateForm;
