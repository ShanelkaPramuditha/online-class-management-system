import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react';

function Faq() {

  let condition = true;
  let options = [];

  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    MainCategory: "",
    SubCategory: "",
    Question: "",
    Answer: "",
  })

  const { MainCategory, SubCategory, Question, Answer } = formData;

  if (formData.MainCategory == 'Grade12') {
    options = ['Unit1', 'Unit2', 'Unit3', 'Unit4', 'Unit5'];
  } else if (formData.MainCategory == 'Grade13') {
    options = ['Unit1', 'Unit2', 'Unit3', 'Unit4'];
  } else if (formData.MainCategory == 'Platform') {
    options = ['Login', 'SignUp'];
  } else if (formData.MainCategory == 'Feature') {
    options = ['Fees', 'Theory', 'Revision', 'Model Papers'];
  }

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
      MainCategory,
      SubCategory,
      Question,
      Answer,

    }
    console.log('payload', payload)

    if (payload.MainCategory == '') {
      alert('Enter MainCategory')
    }
    if (payload.SubCategory == '') {
      alert('Enter SubCategory')
    }
    if (payload.Question == '') {
      alert('Enter Question')
    }
    // if (payload.Answer == '') {
    //   alert('Enter Answer')
    // }

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

    setFormData(userData[key])
    const ID = userData[key]._id
    console.log('KEYYY: ', ID)

    condition = true;
  }

  //Update - Put
  function UpdateFAQ() {
    console.log('** Trigger Update **')
    //Find User Email By Row ID
    const id = formData._id
    console.log('Form data key: ', id)

    const url = `http://localhost:5000/api/faq/update/${id}`
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
    }

    setFormData(formData)

    axios.put(url, formData, config)
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

  // function searchByMainCatagory(key) {
  //   const searchData = key;
  //   console.log('searchData: ', searchData);
  //   // const url = `http://localhost:5000/api/faq/get/${searchData}`
  //   const config = {
  //     headers: {
  //       "x-apikey": "API_KEY",
  //     },
  //     dataType: "json"
  //   }
  //   axios.get(`http://localhost:5000/api/faq/get/mainCategory/${searchData}`, config)
  //     .then((response) => {
  //       console.log('result:', response)
  //       setUserData(response.data.items)
  //     })
  // }

  const searchByMainCatagory = (key) => {
    const searchData = key;
    // const url = `http://localhost:5000/api/faq/get/${searchData}`

    if (searchData == 'Reset') {
      UpdateData()
    }
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
      dataType: "json"
    }
    axios.get(`http://localhost:5000/api/faq/get/mainCategory/${searchData}`, config)
      .then((response) => {
        console.log('result:', response)
        setUserData(response.data.items)
      })
  }


  const RowGen = () => {
    return userData.map((item, index) => (
      <tr className="py-4" key={index}>
        <td className="px-4 border-2 border-black">{item.MainCategory}</td>
        <td className="px-4 border-2 border-black">{item.SubCategory}</td>
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
        <div class="place-content-center w-full">
          <ul class="menu menu-horizontal px-3 gap-4 center">
            <li><button class="rounded-full border py-0" onClick={() => searchByMainCatagory('Platform')} >Platform</button></li>
            <li><button class="rounded-full border py-0" onClick={() => searchByMainCatagory('Feature')} >Feature</button></li>
            <li><button class="rounded-full border py-0" onClick={() => searchByMainCatagory('Grade12')} >Grade 12</button></li>
            <li><button class="rounded-full border py-0" onClick={() => searchByMainCatagory('Grade13')} >Grade 13</button></li>
            <li><button class="rounded-full border py-0" onClick={() => searchByMainCatagory('Reset')} >Reset</button></li>
          </ul>
        </div>
        <div className="">
          <div className="flex">
            <div className="mt-12 m-5">
              <label className=" text-black text-3xl" >MainCategory -</label>
              <br />
              <br />
              <label className=" text-black text-3xl" >SubCategory -</label>
              <br />
              <br />
              <label className="text-black text-3xl">Question -</label>
              <br />
              <br />
              {/* <label className="text-black text-3xl">Answer -</label> */}
            </div>
            <div className="mt-12 m-5 bg-opacity-0 block border-black border-3">
              <select onChange={onChange} value={MainCategory} name='MainCategory' id="MainCategory">
                <option value="Grade12">Grade12</option>
                <option value="Grade13">Grade13</option>
                <option value="platform">Platform</option>
                <option value="feature">Feature</option>
              </select>
              <br />
              <br />
              <select onChange={onChange} value={SubCategory} name='SubCategory' id="SubCategory">
                {options.map(option => <option key={option} value={option}>{option}</option>)}
                {/* <option value="Sub1">Unit1</option>
                <option value="Sub2">Unit2</option>
                <option value="Sub3">Unit3</option>
                <option value="Sub4">Unit4</option> */}
              </select>
              <br />
              <br />
              <input onChange={onChange} value={Question} name='Question' placeholder="Enter Question"
                className="border-slate-600 placeholder-gray-600 bg-black bg-opacity-0 pb-3 border-b-2 
              text-2xl" type="text" required />
              <br />
              <br />
              {/* <input onChange={onChange} value={Answer} name='Answer' placeholder="Enter Answer"
                className="border-slate-600 placeholder-gray-600 bg-black bg-opacity-0 pb-3 border-b-2 
              text-2xl" type="text" required /> */}
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
            {condition ? (
              <button className="flex-2 w-44 h-14 font-bold text-xl bg-white 
              bg-opacity-45 px-6 py-3 rounded-full"
                onClick={UpdateFAQ}
              >Update</button>
            ) : null}
          </div>
        </div>
        <div>

          <div className="">
            <table className="text-3xl backdrop-blur-lg ">
              <thead>
                <tr className="">
                  <th className="px-4 border-2 border-black">MainCategory</th>
                  <th className="px-4 border-2 border-black">SubCategory</th>
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

export default Faq;