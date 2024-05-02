import { useState } from 'react'
import axios from 'axios'

function Crud() {
  const [Data, setData] = useState([])

  function UpdateData() {
    const url = "http://localhost:3000/papers"
    const config = {
      headers: {
        "x-apikey": "API_KEY",
      },
      dataType: "json"
    }

    axios.get(url, config)
      .then((response) => {
        setData(response.data.response)
      })
  }

  function AddToCart() {

  }

  const RowGen = () => {
    UpdateData()
    return Data.map((Paper, index) => (
      <tr className="py-4" key={index}>
        {/* <td className="px-4 border-2 border-black">{Paper.Tid}</td> */}
        <td className="px-4 border-2 border-black">{Paper.Des}</td>
        <td className="px-4 border-2 border-black">{Paper.Pid}</td>
        <td className="px-4 border-2 border-black">{Paper.Plink}</td>
        <td className="px-4 border-2 border-black">{Paper.Sdate}</td>
        <td className="px-4 border-2 border-black">{Paper.Edate}</td>
        
      </tr>
    ))
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div>
        
          <div className="bg-gradient-to-br from-green-400 to-purple-400  backdrop-brightness-200  backdrop-contrast-50 bg-white opacity-85 rounded-md m-6 p-6">
            <div className="bg-opacity-60 backdrop-blur-sm  backdrop-brightness-200   bg-white opacity-85 rounded-md m-6 p-6 flex flex-col items-center justify-center">
           
              <label className=" font-serif font-bold  text-4xl bg-gradient-to-r from-yellow-300 to-orange-500">TEST PAPERS</label><br></br>
               
              <table className="text-3xl backdrop-blur-lg ">
                <thead>
                  
                  <tr className="">
                    {/* <th className="px-4 border-2 border-black">Teacher ID</th> */}
                    <th className="font-serif px-4 border-2 border-black">Description</th>
                    <th className="font-serif px-4 border-2 border-black">Paper ID</th>
                    <th className="font-serif px-4 border-2 border-black">Link</th>
                    <th className="font-serif px-4 border-2 border-black">Start Date</th>
                    <th className="font-serif px-4 border-2 border-black">End Date</th>
                    
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
      
    </>
  )
}

export default Crud;