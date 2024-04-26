import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react';

function FaqHandling() {

  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    FAQID: "",
    Question: "",
    Answer: "",
  })

  const { FAQID, Question, Answer } = formData;

  useEffect(() => UpdateData, [])

  //Read - Get 
  function UpdateData() {
    const url = "http://localhost:5000/api/faq/get"
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
      dataType: "json"
    }
    axios.get(url, config)
      .then((response) => {
        console.log('result:', response)
        setUserData(response.data.items)
      })
  }

  //Create - Post
  const addItem = () => {
    const url = 'http://localhost:5000/api/faq/add'
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    }
    const payload = {
      FAQID,
      Question,
      Answer,

    }
    console.log('payload', payload)

    if(payload.FAQID==''){
      alert('Enter Faq id')
    }
    if(payload.Question==''){
      alert('Enter Question')
    }
    if(payload.Answer==''){
      alert('Enter Answer')
    }

    axios.post(url, payload, config) //Sending a request
      .then((res) => {
        console.log(res)
        console.log(config)
        UpdateData()
      })
      .catch((error) => {
        console.error(error)
      })

  }
  //Update - Put
  function UpdateName(key) {
    //Find User Email By Row ID
    const userId = userData[key]._id
    const url = `http://localhost:5000/api/faq/update/${userId}`
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    }

    const question = prompt('Enter Question')
    const answer = prompt('Enter Answer')
    // var a = prompt("A : ", "");
    // var b = prompt("B : ", "");
    alert(question + "\n" + answer);
    const faqupdate = {
      FAQID: userData[key].FAQID,
      Question: question,
      Answer: answer,
    }
    axios.put(url, faqupdate, config)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })

    UpdateData()
  }
  //Delete - Delete
  function Delete(key) {

    //Find Userid By Row ID
    const userId = userData[key]._id
    console.log('delete id: ', userId)

    //Delete Request Config
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
      data: {
        id: userId,
      },
    }

    axios.delete(`http://localhost:5000/api/faq/delete/${userId}`, config)
      .then(() => {
        console.log("Deleted")
        UpdateData()
      })
  }


  const RowGen = () => {
    return userData.map((item, index) => (
      <tr className="py-4" key={index}>
        <td className="px-4 border-2 border-black">{item.FAQID}</td>
        <td className="px-4 border-2 border-black">{item.Question}</td>
        <td className="px-4 border-2 border-black">{item.Answer}</td>
        <td className="py-4 flex  px-4 border-2 border-black">
          <button
            type="button"
            className="m-2 block bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 
                    rounded-md focus:outline-none focus:shadow-outline-blue active:bg-violet-900"
            onClick={() => UpdateName(index)}
          >
            Update
          </button>
          <button
            type="button"
            className="m-2 block bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 
                    rounded-md focus:outline-none focus:shadow-outline-blue active:bg-red-900"
            onClick={() => Delete(index)}
          >
            Delete
          </button>

        </td>
      </tr>
    ))
  }

  const onChange = (e) => {
    setFormData((prevformData) => ({
      ...prevformData,
      [e.target.name]: e.target.value
    }))
  }

  return (

    // <div className=" items-center justify-center ">
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <div className="">
          <div className="flex">
            <div className="mt-12 m-5">
              <label className=" text-black text-3xl" >Id    -</label>
              <br />
              <br />
              <label className="text-black text-3xl">Question -</label>
              <br />
              <br />
              <label className="text-black text-3xl">Answer -</label>
            </div>
            <div className="mt-12 m-5 bg-opacity-0 block border-black border-3">
              <input onChange={onChange} value={FAQID} name='FAQID'
                placeholder="Enter FAQ ID "
                className="border-slate-600 placeholder-gray-600 bg-black bg-opacity-0 pb-3 border-b-2 text-2xl"
                type="number" required />
              <br />
              <br />
              <input onChange={onChange} value={Question} name='Question' placeholder="Enter Question"
                className="border-slate-600 placeholder-gray-600 bg-black bg-opacity-0 pb-3 border-b-2 
              text-2xl" type="text" required />
              <br />
              <br />
              <input onChange={onChange} value={Answer} name='Answer' placeholder="Enter Answer"
                className="border-slate-600 placeholder-gray-600 bg-black bg-opacity-0 pb-3 border-b-2 
              text-2xl" type="text" required />
            </div>
          </div>
          <div className="flex text-center justify-center content-center">
            <div className="flex w-4 bg-opacity-0">
            </div>
            <div className="mb-5 flex w-44 h-14 max-w-sm rounded-full bg-gradient-to-tr from-rose-300 to-red-300 p-0.5 shadow-lg">
              <button className="flex-1 w-44 h-14 font-bold text-xl bg-white 
              bg-opacity-45 px-6 py-3 rounded-full"
                onClick={addItem}
              >Add To List</button>
            </div>
          </div>
        </div>
        <div>

          <div className="">
            <table className="text-3xl backdrop-blur-lg ">
              <thead>
                <tr className="">
                  <th className="px-4 border-2 border-black">ID</th>
                  <th className="px-4 border-2 border-black">Question</th>
                  <th className="px-4 border-2 border-black">Answer</th>
                  <th className="px-4 border-2 border-black">Action</th>
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


    // <div>
    //   <p>
    //     Dilumi Gimansha
    //   </p>
    //   <div className="bg-opacity-60 backdrop-blur-sm  backdrop-brightness-200  backdrop-contrast-50 bg-white opacity-85 rounded-md m-4 p-4">
    //     <table className="text-3xl backdrop-blur-lg ">
    //       <thead>
    //         <tr className="">
    //           <th className="px-4 border-2 border-black">ID</th>
    //           <th className="px-4 border-2 border-black">Name</th>
    //           <th className="px-4 border-2 border-black">Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {/* <RowGen /> */}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

  )
}

export default FaqHandling;