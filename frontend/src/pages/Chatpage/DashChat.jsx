import React from 'react';
import Usercircle from '../../assets/user-circle.svg';
import Send from '../../assets/images/send-2.svg';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import Edit from '../../assets/images/edit.svg';
import Delete from '../../assets/images/trash.svg';
import chat from '../../assets/images/chat.jpg';
import Arrow from '../../assets/images/arrow-narrow-down.png';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io.connect('http://localhost:5000');

const Dash = () => {
   const [msgs, setmsgs] = useState([]);
   const [input, setinput] = useState('');
   const [options, setoptions] = useState(false);
   const [selcted, setselcted] = useState(null);
   const [editinput, seteditinput] = useState('');
   const [livechat, setlivechat] = useState(false);
   const [edit, setedit] = useState(false);
   const [file, setfile] = useState();
   const [file1, setfile1] = useState(false);
   const [filetype, setfiletype] = useState('');
   const [admin, setadmin] = useState(false);

   // console.log(`selected`, selcted);
   // console.log('megsmsges', msgs);
   console.log(`settype`, filetype);
   console.log(`file`, file);
   console.log(`file01`, file1);

   const chatdash = document.getElementById('chatdash');

   useEffect(() => {
      const handleMessage = (data1, data2, data3) => {
         setmsgs(prevmsgs => [
            ...prevmsgs,
            {
               Messages: data1,
               Username: data2,
               dateTime: data3
            }
         ]);
         scroolbtn();
      };
      socket.on('message_deleted', deletedId => {
         setmsgs(prevmsgs =>
            prevmsgs.filter(msg => msg.idofmessage !== deletedId)
         );
      });

      const handleMessageDeleted = deletedId => {
         setmsgs(prevmsgs =>
            prevmsgs.filter(msg => msg.idofmessage !== deletedId)
         );
      };
      socket.on('message_deleted', handleMessageDeleted);
      socket.on('recived_msg', handleMessage);

      return () => {
         socket.off('recived_msg', handleMessage);
         socket.off('message_deleted', handleMessageDeleted);
      };
   }, [socket]);

   useEffect(() => {
      fetchmeg();
   }, []);

   const fetchmeg = async () => {
      try {
         const res = await fetch(`http://localhost:5000/msg13`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         const resdata = await res.json();
         setmsgs(resdata);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   const user = JSON.parse(localStorage.getItem('authStore'));
   console.log(`user`, user);
   const user1 = user?.state.firstName;
   console.log(`user1`, user1);

   if (user1 === 'Nameadmin') {
      setadmin(true);
   }

   const deletemsg = async msgId => {
      try {
         const res = await fetch(`http://localhost:5000/deletemsg13/${msgId}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         socket.emit('delete_msg', msgId);
         fetchmeg();
      } catch (e) {
         console.log(e);
      }
   };
   const deleteAll = async () => {
      try {
         const res = await fetch(`http://localhost:5000/deleteAll13`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         fetchmeg();
      } catch (e) {
         console.log(e);
      }
   };
   const removemsg = msgId => {
      Swal.fire({
         title: 'Are you delete?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#747976',
         cancelButtonColor: '#C2C8C4',
         confirmButtonText: 'delete'
      }).then(result => {
         if (result.isConfirmed) {
            deletemsg(msgId);
            Swal.fire({
               title: 'Deleted!',
               text: 'Your message has been deleted.',
               icon: 'success'
            });
         }
      });
   };
   const removeAll = () => {
      Swal.fire({
         title: 'Are You Clear Chat?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#747976',
         cancelButtonColor: '#C2C8C4',
         confirmButtonText: 'delete'
      }).then(result => {
         if (result.isConfirmed) {
            deleteAll();
            Swal.fire({
               title: 'Deleted All Messages!',
               text: 'Your message has been deleted.',
               icon: 'success'
            });
         }
      });
   };
   const editdetail1 = async msgId => {
      try {
         const res = await fetch(`http://localhost:5000/editdetail/${msgId}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            }
         });
         const resdata = await res.json();
         seteditinput(resdata.existmsg);
      } catch (error) {
         console.error('error:', error);
      }
   };
   const editdetail2 = async msgId => {
      try {
         const res = await fetch(
            `http://localhost:5000/editdetail13/${msgId}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json'
               }
            }
         );
         const resdata = await res.json();
         setfiletype(resdata.filetype);
      } catch (error) {
         console.error('error:', error);
      }
   };

   const editmsg = async msgId => {
      try {
         const res = await fetch(`http://localhost:5000/editmsg13/${msgId}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               message: editinput
            })
         });
         seteditinput('');
         setedit(false);
         fetchmeg();
         setselcted(null);
      } catch (er) {
         console.log(er);
      }
   };

   const generatereport = async () => {
      const doc = new jsPDF();
      doc.text('Livechat Summary Report', 105, 10, { align: 'center' });
      const res = await fetch(`http://localhost:5000/report1313`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      });

      const resdata = await res.json();
      console.log(`report`, resdata);
      const body = resdata.map(({ _id, nummesg }) => [_id, nummesg]);

      const tabledecarate = {
         styles: {
            cellPadding: 2,
            fontSize: 12,
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            lineWidth: 0.1,
            lineColor: [0, 0, 0]
         },
         headStyles: {
            fillColor: [105, 105, 105],
            fontSize: 14,
            textColor: [255, 255, 255],
            fontStyle: 'bold'
         }
      };

      doc.autoTable({
         head: [['Sender Name', 'Number of Messages']],
         body: body,
         ...tabledecarate
      });

      doc.save('livechatreport.pdf');
   };

   const sendmessage = async () => {
      const res1 = await fetch(`http://localhost:5000/message13`, {
         method: 'POST',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({
            message: input,
            firstName: user1
         })
      });
      const just = 'Just Now';
      console.log(`res11`, user?.id);
      socket.emit('send_msg', input, user1, just);
      setinput('');
      fetchmeg();
      scroolbtn();
   };
   const sendfile = async () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('firstName', user1);
      console.log(`filefile`, file);

      try {
         const response = await axios.post(
            'http://localhost:5000/uploadfile13',
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            }
         );
         console.log('File uploaded successfully:', response.data);
         socket.emit('send_file', response.data, user1);
         setinput('');
         fetchmeg();
         scroolbtn();
         setfile1(false);
      } catch (error) {
         console.error('Error uploading file:', error);
      }
   };
   const getfiles = async msgId => {
      try {
         const res = await fetch(
            `http://localhost:5000/editdetail13/${msgId}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json'
               }
            }
         );
         const resdata = await res.json();
         const selectfile = resdata.existmsg;
         console.log(selectfile);
         window.open(`http://localhost:5000/${selectfile}`);
         setfiletype('');
      } catch (error) {
         console.error('error:', error);
      }
   };

   const scroolbtn = async () => {
      chatdash.scrollTo({
         top: aboutSection.current.offsetTop,
         behavior: 'smooth'
      });
   };

   const formatDate = dateString => {
      const date = new Date(dateString);
      const month = date.getMonth();
      const day = date.getDate();
      return `${month}/${day}`;
   };

   const formatTime = timeString => {
      const time = new Date(timeString);
      const hour = time.getHours();
      const minutes = time.getMinutes();
      return `${hour}:${minutes}`;
   };

   return (
      <div className="flex flex-col items-center justify-center h-full bg-silver-mist">
         {!livechat && (
            <div>
               <div className="my-5 text-5xl font-bold font-Rowdies">
                  <span className="text-6xl ">{user1},</span> Welcome to Live
                  Chat
               </div>
               <div>
                  <button
                     className="w-32 h-12 p-2 text-xl font-semibold text-center border rounded-md bg-light-blue"
                     onClick={() => setlivechat(false)}>
                     Get Started
                  </button>
                  <button
                     className="w-32 h-12 p-2 text-xl font-semibold text-center border rounded-md bg-light-blue ml-[80%]"
                     onClick={() => setlivechat(true)}>
                     Get Started
                  </button>
               </div>
               <div className="mt-4 rounded-lg">
                  <img src={chat}></img>
               </div>
            </div>
         )}

         {livechat && (
            <div className="w-full bg-silver-mist h-[600px] flex items-center justify-center flex-col mt-6">
               <div className=" bg-silver-mist w-[600px] shadow-lg shadow-neutral-500 border border-black h-[600px] flex flex-col items-center justify-center">
                  {admin && (
                     <div className="flex flex-row items-baseline ml-auto">
                        <button
                           className="p-1 mt-1 ml-auto mr-5 text-sm border rounded shadow-md bg-light-gray text-neutral-950 shadow-neutral-400"
                           onClick={() => removeAll()}>
                           Clear Chat
                        </button>
                        <button
                           className="p-1 mt-1 ml-auto mr-1 text-sm border rounded shadow-md bg-light-gray text-neutral-950 shadow-neutral-400"
                           onClick={() => generatereport()}>
                           Summary
                        </button>
                     </div>
                  )}
                  <div className="h-10 w-[80%] bg-light-gray m-3 border rounded-full text-center p-2 text-lg font-mono text-neutral-950 shadow-md shadow-neutral-500">
                     Live Chat
                  </div>
                  <div
                     className="w-[80%] h-[480px] bg-light-gray overflow-y-scroll rounded-md  shadow-md shadow-neutral-600"
                     id="chatdash">
                     <div className=" h-fit">
                        {options && (
                           <div className="flex flex-row items-center justify-center mt-3 -mb-4 border-x-0 border-neutral-900 ">
                              <div className="absolute flex flex-row items-center justify-center w-20 h-6 bg-light-gray ">
                                 <img
                                    src={Delete}
                                    onClick={() => {
                                       console.log(selcted);
                                       removemsg(selcted);
                                       setoptions(false);
                                    }}
                                    className="w-5 mr-2 cursor-pointer"></img>
                                 {edit && (
                                    <img
                                       src={Edit}
                                       onClick={() => {
                                          editdetail1(selcted);
                                       }}
                                       className="w-5 ml-2 cursor-pointer"></img>
                                 )}
                              </div>
                           </div>
                        )}
                        {/* {console.log(`mmmmmm`, msgs)} */}
                        {msgs.map(msg => {
                           // console.log(`msdfgh`, msg);
                           if (user1 == msg?.Username) {
                              return (
                                 <div className="flex flex-col mt-1 mb-2">
                                    <div className="flex flex-row ml-auto">
                                       <div className="ml-1 mr-1 font-sans text-[8px] text-neutral-500 mt-1">
                                          {formatTime(msg.dateTime) +
                                             '   ' +
                                             formatDate(msg.dateTime)}
                                       </div>
                                       <div className="ml-0 font-sans text-xs text-neutral-600">
                                          You
                                       </div>

                                       <img
                                          src={Usercircle}
                                          className="rounded-full shadow-sm shadow-neutral-500"
                                          width={16}
                                          height={15}></img>
                                    </div>
                                    <div
                                       onClick={() => {
                                          setedit(true);
                                          editdetail2(msg.idofmessage);
                                          setselcted(msg.idofmessage);
                                          setoptions(true);
                                          console.log(`setselcted`, selcted);
                                          if (filetype === 'file') {
                                             setedit(false);
                                             getfiles(msg.idofmessage);
                                             setfiletype(' ');
                                          }
                                          setfiletype(' ');
                                       }}
                                       className={`max-h-full min-w-0 min-h-0 p-1 mb-1 ml-auto mr-2 font-sans text-sm shadow cursor-pointer shadow-neutral-400 w-fit max-w-64  rounded-b-xl rounded-tl-xl h-fit text-neutral-800 ${
                                          selcted === msg.idofmessage
                                             ? 'bg-light-gray'
                                             : 'bg-cold-gray'
                                       }`}>
                                       {msg.Messages}
                                    </div>
                                 </div>
                              );
                           } else {
                              return (
                                 <div className="flex flex-col mt-2 mb-2">
                                    <div className="flex flex-row">
                                       <img
                                          src={Usercircle}
                                          className="rounded-full shadow-sm shadow-neutral-500"
                                          width={16}
                                          height={16}></img>

                                       <div className="ml-1 font-sans text-xs text-neutral-600">
                                          {msg.Username}
                                       </div>
                                       <div className="ml-1 mr-2 font-sans text-[8px] text-neutral-500 mt-1">
                                          {!isNaN(
                                             new Date(msg.dateTime).getTime()
                                          )
                                             ? formatDate(msg.dateTime) +
                                               ' ' +
                                               formatTime(msg.dateTime)
                                             : 'justNow'}
                                       </div>
                                    </div>
                                    <div
                                       onClick={() => {
                                          editdetail2(msg.idofmessage);
                                          setselcted(msg.idofmessage);
                                          admin
                                             ? setoptions(true)
                                             : setoptions(false);
                                          setedit(false);
                                          console.log(`setselcted`, selcted);
                                          if (filetype === 'file') {
                                             getfiles(msg.idofmessage);
                                          }
                                       }}
                                       className={`max-h-full min-w-0 min-h-0 p-1 mb-1 ml-2 font-sans text-sm shadow cursor-pointer shadow-neutral-400 w-fit max-w-64  rounded-b-xl rounded-tr-xl h-fit text-neutral-800 ${
                                          selcted === msg.idofmessage
                                             ? 'bg-cold-gray'
                                             : 'bg-light-gray'
                                       }`}>
                                       {msg.Messages}
                                    </div>
                                 </div>
                              );
                           }
                        })}
                     </div>
                     {/* {scrolls && (
                        <div className="flex flex-col " id="scroolbtn">
                           <div className="absolute flex flex-row mb-2 ml-auto mr-2 ">
                              <img
                                 src={Arrow}
                                 width={25}
                                 height={30}
                                 onClick={() => scroolbtn()}
                                 className="rounded-full shadow bg-dark-red shadow-dark-gray"></img>
                           </div>
                        </div>
                     )} */}
                  </div>
                  <div
                     onClick={() => {
                        // setselcted('');
                        setoptions(false);
                     }}
                     className=" bg-light-gray w-[80%] h-[50px] border m-3 rounded-lg flex items-center justify-center shadow-sm shadow-neutral-500">
                     <diV className="w-2 ml-2 -mr-8 opacity-100">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           class="icon icon-tabler icon-tabler-file-horizontal"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           stroke-width="1.5"
                           stroke="#597e8d"
                           fill="none"
                           stroke-linecap="round"
                           stroke-linejoin="round">
                           <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                           <path d="M16 5v4a1 1 0 0 0 1 1h4" />
                           <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-7l-5 -5h-11a2 2 0 0 0 -2 2z" />
                        </svg>
                     </diV>
                     <input
                        type="file"
                        onClick={() => {
                           setfile1(true);
                        }}
                        onChange={e => setfile(e.target.files[0])}
                        className="w-1 h-3 px-4 py-2 mt-2 ml-5 leading-tight border rounded-md opacity-0 appearance-none text-neutral-800 bg-cold-gray border-y-neutral-800 focus:outline-none focus:border-blue-500"></input>
                     <input
                        type="text"
                        value={edit ? editinput : input}
                        onChange={e =>
                           edit
                              ? seteditinput(e.target.value)
                              : setinput(e.target.value)
                        }
                        onClick={() => {
                           // setfile1(false);
                           edit && setselcted(selcted);
                        }}
                        className="h-8 p-2 mt-2 ml-1 border rounded-md shadow-md shadow-neutral-500 bg-light-silver w-96"
                        placeholder="Enter Message..."></input>

                     {/* <input
               type="file"
               className="px-4 py-2 leading-tight text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-blue-500"
            /> */}

                     <img
                        src={Send}
                        onClick={
                           edit
                              ? () => {
                                   editmsg(selcted);
                                   setedit(false);
                                }
                              : file1
                              ? () => sendfile()
                              : () => sendmessage()
                        }
                        className="cursor-pointer hover:bg-cold-gray"></img>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Dash;
