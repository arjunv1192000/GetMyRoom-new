import{u as C,k as Z,a as ee,r,j as e,x as D,B as se,y as le,A as te,z as v,_ as F,X as ae,C as re,D as ie,J as I,c as ne,d as A,e as ce,v as de,w as j}from"./index-Nj-fRssU.js";import{a as k,o as T,B as M,F as L,S as oe,N as me,c as xe,d as R,e as he,f as w,g as y,i as ge}from"./Map-5xoU0ECh.js";const fe=()=>{const a=C(),n=Z(),s=ee(i=>i.admin.value),[l,d]=r.useState(!1),[t,o]=r.useState(!1),[m,x]=r.useState(!1),h=()=>{u()},f=()=>{n(ie()),a("/admin")},u=r.useCallback(()=>{o(i=>!i)},[]);return r.useEffect(()=>{const i=()=>{const b=window.scrollY>0;b!==m&&x(b)};return window.addEventListener("scroll",i),()=>{window.removeEventListener("scroll",i)}},[m]),e.jsxs("header",{className:`w-full     ${m?"bg-white ":""}`,children:[e.jsxs("nav",{className:"mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8","aria-label":"Global",children:[e.jsx("div",{className:"flex lg:flex-1",children:e.jsxs("a",{href:"#",className:"-m-1.5 p-1.5",children:[e.jsx("span",{className:"sr-only",children:"Your Company"}),e.jsx("img",{className:"h-12 w-auto",src:D,alt:""})]})}),e.jsx("div",{className:"flex lg:hidden",children:e.jsxs("button",{type:"button",className:"-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",onClick:()=>d(!0),children:[e.jsx("span",{className:"sr-only",children:"Open main menu"}),e.jsx(se,{className:"h-6 w-6","aria-hidden":"true"})]})}),e.jsx(le.Group,{className:"hidden lg:flex lg:gap-x-12"}),e.jsx("div",{className:"hidden lg:flex lg:flex-1 lg:justify-end",children:e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"flex flex-row items-center gap-3",children:[e.jsx("a",{href:"#",className:"text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer",onClick:()=>a("/admin/dashboard"),children:"Home"}),e.jsx("a",{href:"#",className:"text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer",onClick:()=>a("/admin/user"),children:"Users"}),e.jsx("a",{href:"#",className:"text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer",onClick:()=>a("/admin/listed"),children:"Listed Properties"}),e.jsx("a",{href:"#",className:"text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer",onClick:()=>a("/admin/unlisted"),children:"Unlisted Properties"}),e.jsxs("div",{onClick:h,className:"p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition",children:[e.jsx(te,{}),e.jsx("div",{className:"hidden md:block",children:e.jsx("img",{className:"h-8 w-8 rounded-full",src:v,alt:""})})]})]}),t&&e.jsx("div",{className:"absolute rounded-xl shadow-md w-[40vm] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm",children:e.jsx("div",{className:"flex flex-col cursor-pointer",children:e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"px-4 py-3 hover:bg-neutral-100 transition font-semibold",children:[" ",s.email," "]}),e.jsx("div",{className:"px-4 py-3 hover:bg-neutral-100 transition font-semibold",onClick:f,children:" Logout"})]})})})]})})]}),e.jsxs(F,{as:"div",className:"lg:hidden",open:l,onClose:d,children:[e.jsx("div",{className:"fixed inset-0 z-10"}),e.jsxs(F.Panel,{className:"fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("a",{href:"#",className:"-m-1.5 p-1.5",children:[e.jsx("span",{className:"sr-only",children:"Your Company"}),e.jsx("img",{className:"h-8 w-auto",src:D,alt:""})]}),e.jsxs("button",{type:"button",className:"-m-2.5 rounded-md p-2.5 text-gray-700",onClick:()=>d(!1),children:[e.jsx("span",{className:"sr-only",children:"Close menu"}),e.jsx(ae,{className:"h-6 w-6","aria-hidden":"true"})]})]}),e.jsx("div",{className:"mt-6 flow-root",children:e.jsxs("div",{className:"-my-6 divide-y divide-gray-500/10",children:[e.jsxs("div",{className:"space-y-2 py-6",children:[e.jsx(re,{as:"div",className:"-mx-3"}),e.jsx("a",{href:"#",className:"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",children:"Dashboard"}),e.jsx("a",{href:"#",className:"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",children:"Users"}),e.jsx("a",{href:"#",className:"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",children:"Listed property"}),e.jsx("a",{href:"#",className:"-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",children:"Non Listed property"})]}),e.jsx("div",{className:"py-6",children:e.jsx("a",{href:"#",className:"-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",children:"Add your home"})})]})})]})]})]})},p=({children:a})=>e.jsxs("div",{children:[e.jsx(fe,{}),e.jsx("main",{children:a})]}),ue=()=>{const a=C();return e.jsxs("div",{className:"flex justify-center items-center h-screen",children:[e.jsxs("div",{className:"w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2",children:[e.jsx("div",{className:"flex justify-end px-4 pt-4"}),e.jsxs("div",{className:"flex flex-col items-center pb-10",children:[e.jsx("img",{className:"w-24 h-24 mb-3 rounded-full shadow-lg",src:v,alt:"Bonnie image"}),e.jsx("h5",{className:"mb-1 text-xl font-medium text-gray-900 dark:text-white",children:"GetMyRoom"}),e.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Users"}),e.jsx("div",{className:"flex mt-4 md:mt-6",children:e.jsx("a",{href:"#",className:"inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:()=>a("/admin/user"),children:"View All"})})]})]}),e.jsxs("div",{className:"w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2",children:[e.jsx("div",{className:"flex justify-end px-4 pt-4"}),e.jsxs("div",{className:"flex flex-col items-center pb-10",children:[e.jsx("img",{className:"w-24 h-24 mb-3 rounded-full shadow-lg",src:v,alt:"Bonnie image"}),e.jsx("h5",{className:"mb-1 text-xl font-medium text-gray-900 dark:text-white",children:"GetMyRoom"}),e.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Listed property"}),e.jsx("div",{className:"flex mt-4 md:mt-6",children:e.jsx("a",{href:"#",className:"inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:()=>a("/admin/listed"),children:"View All"})})]})]}),e.jsxs("div",{className:"w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2",children:[e.jsx("div",{className:"flex justify-end px-4 pt-4"}),e.jsxs("div",{className:"flex flex-col items-center pb-10",children:[e.jsx("img",{className:"w-24 h-24 mb-3 rounded-full shadow-lg",src:v,alt:"Bonnie image"}),e.jsx("h5",{className:"mb-1 text-xl font-medium text-gray-900 dark:text-white",children:"GetMyRoom"}),e.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Unlisted property"}),e.jsx("div",{className:"flex mt-4 md:mt-6",children:e.jsx("a",{href:"#",className:"inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:()=>a("/admin/unlisted"),children:"View All"})})]})]})]})},je=()=>e.jsx(p,{children:e.jsx(ue,{})}),pe=({userId:a,name:n,email:s,phone:l,image:d,dob:t})=>e.jsxs("div",{className:"w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2",children:[e.jsx("div",{className:"flex justify-end px-4 pt-4"}),e.jsxs("div",{className:"flex flex-col items-center pb-10",children:[e.jsx("img",{className:"w-24 h-24 mb-3 rounded-full shadow-lg",src:d,alt:"Bonnie image"}),e.jsx("h5",{className:"mb-1 text-xl font-medium text-gray-900 dark:text-white",children:n}),e.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:s}),e.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:l}),e.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:t})]})]});function be(){const[a,n]=r.useState([]),s=()=>{I.get("/getuserdetails").then(l=>{console.log(l.data.userdata),n(l.data.userdata)}).catch(l=>{console.error(l.message)})};return r.useEffect(()=>{s()},[]),e.jsx(p,{children:e.jsx("div",{className:"flex flex-wrap justify-center gap-4 mt-10",children:a.map(l=>e.jsx(pe,{userId:l==null?void 0:l._id,name:l==null?void 0:l.name,email:l==null?void 0:l.email,phone:l==null?void 0:l.phone,isBlock:l==null?void 0:l.isBlock,dob:l==null?void 0:l.dob,image:l==null?void 0:l.image,fetchData:s}))})})}const Ne=({title:a,location:n,room:s,bathrooms:l,bedrooms:d,date:t,image:o,price:m,username:x,userimg:h})=>e.jsxs("div",{className:"w-[80%] h-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20",children:[e.jsxs("div",{className:" flex flex-col sm:flex-row",children:[e.jsx("img",{className:"object-cover w-full sm:w-2/6",src:o[0],alt:""}),e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx("div",{className:"w-1/2 ml-10",children:e.jsx("h2",{className:"flex  font-semibold text-gray-900 text-[32px] ",children:a})}),e.jsx("div",{className:"w-1/2 ml-10",children:e.jsxs("h2",{className:"font-semibold text-gray-900 text-[32px] ",children:[m,"/month"]})}),e.jsxs("div",{className:"w-1/2 flex flex-row ml-10 mt-2",children:[e.jsx(k,{className:"mt-1.5 "}),e.jsx("h2",{className:"flex  justify-start font-semibold text-gray-900 text-[18px] ml-3 ",children:n.locationName})]}),e.jsxs("div",{className:"w-full h-20 flex flex-row  gap-4 mt-6",children:[e.jsxs("div",{className:"w-20 h-20 ml-4  flex flex-col items-center",children:[e.jsx(T,{color:"red",fill:"red",className:" w-[20px] h-[20px] mt-5"}),e.jsxs("h5",{className:"mb-2 text-sm  tracking-tight text-gray-900 mt-1",children:[s," room"]})]}),e.jsxs("div",{className:"w-20 h-20  flex flex-col items-center",children:[e.jsx(M,{color:"red",fill:"red",className:" w-[20px] h-[20px] mt-5"}),e.jsxs("h5",{className:"mb-2 text-sm  tracking-tight text-gray-900 mt-1",children:[l," room"]})]}),e.jsxs("div",{className:"w-20 h-20  flex flex-col items-center",children:[e.jsx(L,{color:"red",fill:"red",className:" w-[20px] h-[20px] mt-5"}),e.jsxs("h5",{className:"mb-2 text-sm  tracking-tight text-gray-900 mt-1",children:[d,"room"]})]})]})]})]}),e.jsx("hr",{className:"border-t border-gray-300 mt-1"}),e.jsxs("div",{className:"w-full h-20  flex justify-between",children:[e.jsx("div",{className:"flex items-center w-1/2",children:e.jsx("div",{className:"flex-1 min-w-0 ms-4",children:e.jsxs("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:["Listed on ",t]})})}),e.jsxs("div",{className:" mr-10 flex items-center gap-5",children:[e.jsx("div",{className:"flex items-center  flex-row",children:e.jsx("div",{className:"flex-shrink-0 ml-3",children:e.jsx("img",{className:"w-8 h-8 rounded-full",src:h,alt:"Neil image"})})}),e.jsx("div",{className:"flex-1 min-w-0 ms-4",children:e.jsx("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:x})})]})]})]}),we=()=>{const[a,n]=r.useState([]);return r.useEffect(()=>{I.get("/getuserlistedproperty").then(s=>{console.log(s.data.userdata),n(s.data.userdata)}).catch(s=>{console.error(s.message)})},[]),e.jsx(p,{children:e.jsx("div",{className:"bg-white",children:e.jsx("div",{className:"mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ",children:a.map(s=>e.jsx(Ne,{title:s.title,location:s.location,image:s.image,date:s.date,bathrooms:s.bathrooms,bedrooms:s.bedrooms,price:s.price,username:s.userId.name,userimg:s.userId.image},s.id))})})})},ye=({Id:a,title:n,location:s,room:l,bathrooms:d,bedrooms:t,date:o,image:m,price:x,username:h,userimg:f})=>{const u=C();return e.jsx("div",{className:"w-[80%] h-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20",children:e.jsxs("a",{href:"",onClick:()=>u(`/admin/details?Id=${a}`),children:[e.jsxs("div",{className:" flex flex-col sm:flex-row",children:[e.jsx("img",{className:"object-cover w-full sm:w-2/6",src:m[0],alt:""}),e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx("div",{className:"w-1/2 ml-10",children:e.jsx("h2",{className:"flex  font-semibold text-gray-900 text-[32px] ",children:n})}),e.jsx("div",{className:"w-1/2 ml-10",children:e.jsxs("h2",{className:"font-semibold text-gray-900 text-[32px] ",children:[x,"/month"]})}),e.jsxs("div",{className:"w-1/2 flex flex-row ml-10 mt-2",children:[e.jsx(k,{className:"mt-1.5 "}),e.jsx("h2",{className:"flex  justify-start font-semibold text-gray-900 text-[18px] ml-3 ",children:s.locationName})]}),e.jsxs("div",{className:"w-full h-20 flex flex-row  gap-4 mt-6",children:[e.jsxs("div",{className:"w-20 h-20 ml-4  flex flex-col items-center",children:[e.jsx(T,{color:"red",fill:"red",className:" w-[20px] h-[20px] mt-5"}),e.jsxs("h5",{className:"mb-2 text-sm  tracking-tight text-gray-900 mt-1",children:[l," room"]})]}),e.jsxs("div",{className:"w-20 h-20  flex flex-col items-center",children:[e.jsx(M,{color:"red",fill:"red",className:" w-[20px] h-[20px] mt-5"}),e.jsxs("h5",{className:"mb-2 text-sm  tracking-tight text-gray-900 mt-1",children:[d," room"]})]}),e.jsxs("div",{className:"w-20 h-20  flex flex-col items-center",children:[e.jsx(L,{color:"red",fill:"red",className:" w-[20px] h-[20px] mt-5"}),e.jsxs("h5",{className:"mb-2 text-sm  tracking-tight text-gray-900 mt-1",children:[t,"room"]})]})]})]})]}),e.jsx("hr",{className:"border-t border-gray-300 mt-1"}),e.jsxs("div",{className:"w-full h-20  flex justify-between",children:[e.jsx("div",{className:"flex items-center w-1/2",children:e.jsx("div",{className:"flex-1 min-w-0 ms-4",children:e.jsxs("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:["Added on ",o]})})}),e.jsxs("div",{className:" mr-10 flex items-center gap-5",children:[e.jsx("div",{className:"flex items-center  flex-row",children:e.jsx("div",{className:"flex-shrink-0 ml-3",children:e.jsx("img",{className:"w-8 h-8 rounded-full",src:f,alt:"Neil image"})})}),e.jsx("div",{className:"flex-1 min-w-0 ms-4",children:e.jsx("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:h})})]})]})]})})},ve=()=>{const[a,n]=r.useState([]);return r.useEffect(()=>{I.get("/getuserunlistedproperty").then(s=>{console.log(s.data.userdata),n(s.data.userdata)}).catch(s=>{console.error(s.message)})},[]),e.jsx(p,{children:e.jsx("div",{className:"bg-white",children:e.jsx("div",{className:"mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ",children:a.map(s=>e.jsx(ye,{Id:s._id,title:s.title,location:s.location,image:s.image,date:s.date,bathrooms:s.bathrooms,bedrooms:s.bedrooms,price:s.price,username:s.userId.name,userimg:s.userId.image},s.id))})})})},ke=({title:a,proId:n,location:s,room:l,bathrooms:d,bedrooms:t,date:o,image:m,price:x,Id:h,description:f,username:u,features:i,userimg:b,floorplans:O,sellertype:$,email:_})=>{const V=C(),[S,G]=r.useState(!1);r.useState(!1),r.useState(!1);const[E,z]=r.useState(!1),[B,Y]=r.useState(!1);r.useState(!1);const[P,q]=r.useState(!1),[N,X]=r.useState("image"),H=()=>{G(!S)},J=()=>{Y(!B)},K=()=>{z(!E)},Q=()=>{q(!P)},U=c=>{X(c)},W=async()=>{try{(await I.post("/verify",{postId:n})).data.status==!0?(A.success("property verified Successfully"),V("/admin/listed")):A.error("property verification failed ")}catch(c){console.error("Error Saving this job:",c)}};return e.jsxs("div",{className:"w-full h-auto bg-[#f7f4fb] flex flex-col justify-center items-center ",children:[e.jsxs("div",{className:"w-[95%] sm:w-[80%] md:w-[80%] lg:w-[80%] h-auto mt-10 flex flex-col justify-center items-center",children:[e.jsxs("div",{className:"w-full h-auto flex flex-col",children:[e.jsxs("div",{className:"w-full h-auto flex flex-col sm:flex-row",children:[e.jsx("div",{className:"w-1/2",children:e.jsx("h2",{className:"flex  font-semibold text-gray-900 text-[32px] ",children:a})}),e.jsx("div",{className:"w-1/2",children:e.jsxs("h2",{className:"flex sm:justify-end  font-semibold text-gray-900 text-[32px] ",children:["$",x,"/month"]})})]}),e.jsx("div",{className:"w-full   flex flex-col sm:flex-row",children:e.jsxs("div",{className:"w-1/2 flex flex-row ",children:[e.jsx(k,{className:"mt-1.9 "}),e.jsxs("h2",{className:"flex  justify-start font-semibold text-gray-900 text-[18px] ml-3 ",children:[" ",s.locationName]})]})})]}),e.jsxs("div",{className:"w-full h-auto shadow-md mt-3  mb-10",children:[N==="image"&&e.jsx("div",{className:"w-full h-[600px] bg-black   ",children:e.jsx(oe,{navigation:!0,modules:[me],className:"mySwiper",children:m.map((c,g)=>e.jsx(xe,{children:e.jsx("img",{className:"w-full h-[600px] object-fit",src:c,alt:`Image ${g+1}`})},g))})}),N==="location"&&e.jsx("div",{className:"w-full h-[600px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden ",children:e.jsx(R,{location:s})}),e.jsxs("div",{className:"w-[150px] h-auto mt-3  flex flex-row gap-2 mb-5",children:[e.jsx("button",{className:`w-10 h-10 bg-black bg-opacity-50 text-white px-3 py-2 border rounded ml-1 ${N==="image"?"border-blue-500":""}`,onClick:()=>U("image"),children:e.jsx(he,{})}),e.jsx("button",{className:`w-10 h-10 bg-black bg-opacity-50 text-white px-3 py-2 border rounded ${N==="location"?"border-blue-500":""}`,onClick:()=>U("location"),children:e.jsx(k,{})})]})]}),e.jsx("div",{className:"w-full h-auto  bg-white mt-10  shadow-md",children:e.jsxs("div",{className:"w-full h-auto flex flex-col",children:[e.jsx("div",{className:"w-full h-16",children:e.jsx("h2",{className:"mt-3 font-semibold text-gray-900 text-[24px] ml-3 ",children:"overview"})}),e.jsxs("div",{className:"w-full h-auto grid grid-cols-2 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8 gap-y-8 ",children:[e.jsxs("div",{className:"w-40  h-30  flex flex-col items-center bg-white",children:[e.jsx("h5",{className:"mb-2 text-base font-sans  font-medium tracking-tight text-gray-900 mt-1",children:"Updated On:"}),e.jsx("h5",{className:"mb-5 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1  ml-10",children:o})]}),e.jsxs("div",{className:"w-32  h-20  flex flex-col items-center bg-white",children:[e.jsx(L,{color:"red",fill:"red",className:" w-[20px] h-[20px] mt-5"}),e.jsxs("h5",{className:"mb-2 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1",children:[d," Bedrooms"]})]}),e.jsxs("div",{className:"w-32  h-20  flex flex-col items-center bg-white",children:[e.jsx(M,{color:"red",fill:"red",className:" w-[20px] h-[20px] mt-5"}),e.jsxs("h5",{className:"mb-2 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1",children:[t," Bathrooms"]})]})]})]})}),e.jsxs("div",{className:"w-full h-auto flex flex-col sm:flex-row mt-6 ml-5",children:[e.jsxs("div",{className:"w-full sm:w-2/4 h-auto  flex flex-col gap-5 mb-5 ",children:[e.jsxs("div",{className:"w-[96%] h-auto bg-white shadow-md rounded-md",children:[e.jsxs("div",{className:"flex items-center justify-between cursor-pointer h-20",onClick:H,children:[e.jsx("h3",{className:"text-base font-sans  font-semibold ml-5",children:"Description"}),S?e.jsx(w,{className:"mr-5"}):e.jsx(y,{className:"mr-5"})]}),S&&e.jsx("div",{className:"mt-1 w-full h-auto bg-white",children:e.jsx("h3",{className:"text-base font-sans  font-semibold m-10",children:f})})]}),e.jsxs("div",{className:"w-[96%] h-auto bg-white shadow-md rounded-md",children:[e.jsxs("div",{className:"flex items-center justify-between cursor-pointer h-20",onClick:J,children:[e.jsx("h3",{className:"text-base font-sans  font-semibold ml-5",children:"Map"}),B?e.jsx(w,{className:"mr-5"}):e.jsx(y,{className:"mr-5"})]}),B&&e.jsx("div",{className:"mt-1 w-full h-auto",children:e.jsx("div",{className:"w-full h-[400px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20",children:e.jsx(R,{location:s})})})]}),e.jsxs("div",{className:"w-[96%] h-auto bg-white shadow-md rounded-md",children:[e.jsxs("div",{className:"flex items-center justify-between cursor-pointer h-20",onClick:Q,children:[e.jsx("h3",{className:"text-base font-sans  font-semibold ml-5",children:"Floor Plans"}),P?e.jsx(w,{className:"mr-5"}):e.jsx(y,{className:"mr-5"})]}),P&&e.jsx("div",{className:"mt-1 w-full h-auto ",children:e.jsx("div",{className:"max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg md:max-w-2xl flex justify-center pb-32",children:e.jsx("img",{className:"h-80 w-80   object-cover  p-4",src:O,alt:"Video Thumbnail"})})})]})]}),e.jsx("div",{className:"w-full sm:w-2/4 h-auto  flex flex-col gap-5 mb-5 ",children:e.jsxs("div",{className:"w-[96%] h-auto bg-white shadow-md rounded-md",children:[e.jsxs("div",{className:"flex items-center justify-between cursor-pointer h-20",onClick:K,children:[e.jsx("h3",{className:"text-base font-sans  font-semibold ml-5",children:"Features"}),E?e.jsx(w,{className:"mr-5"}):e.jsx(y,{className:"mr-5"})]}),E&&e.jsxs("div",{className:"mt-1 w-full h-auto flex flex-col",children:[e.jsxs("div",{className:"w-full h-auto",children:[e.jsx("h5",{className:"mb-2 text-lg font-sans  font-semibold ml-5  tracking-tight text-gray-900 mt-1",children:"Interior Details"}),e.jsx("div",{className:"w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 gap-y-8 ",children:i==null?void 0:i.interiorDetails.map((c,g)=>e.jsx("div",{className:"flex flex-row ml-5",children:e.jsx("h5",{className:"mb-2 text-base font-sans font-medium  tracking-tight text-gray-900 mt-3",children:c})}))})]}),e.jsxs("div",{className:"w-full h-auto",children:[e.jsx("h5",{className:"mb-2 text-lg font-sans  font-semibold ml-5  tracking-tight text-gray-900 mt-1",children:"Outdoor Details"}),e.jsx("div",{className:"w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 gap-y-8 ",children:i==null?void 0:i.outdoorDetails.map((c,g)=>e.jsx("div",{className:"flex flex-row ml-5",children:e.jsx("h5",{className:"mb-2 text-base font-sans font-medium  tracking-tight text-gray-900 mt-3",children:c})}))})]}),e.jsxs("div",{className:"w-full h-auto",children:[e.jsx("h5",{className:"mb-2 text-lg font-sans  font-semibold ml-5  tracking-tight text-gray-900 mt-1",children:"Utilities"}),e.jsx("div",{className:"w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 gap-y-8 ",children:i==null?void 0:i.utilities.map((c,g)=>e.jsx("div",{className:"flex flex-row ml-5",children:e.jsx("h5",{className:"mb-2 text-base font-sans font-medium  tracking-tight text-gray-900 mt-3",children:c})}))})]}),e.jsxs("div",{className:"w-full h-auto",children:[e.jsx("h5",{className:"mb-2 text-lg font-sans  font-semibold ml-5  tracking-tight text-gray-900 mt-1",children:"Other Features"}),e.jsx("div",{className:"w-full h-auto grid grid-cols-1 gap-3 gap-x-3 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-3 gap-y-3 ",children:i==null?void 0:i.otherFeatures.map((c,g)=>e.jsx("div",{className:"flex flex-row ml-5",children:e.jsx("h5",{className:"mb-2 text-base font-sans font-medium  tracking-tight text-gray-900 mt-3",children:c})}))})]})]})]})})]}),e.jsxs("div",{className:" sm:flex w-11/12 h-auto bg-white shadow-md mt-10 rounded-md mb-10 flex flex-row",children:[e.jsx("img",{className:"w-60 h-60 bg-white border border-gray-200 rounded-lg shadow items-center m-6 object-cover",src:b,alt:"Video Thumbnail"}),e.jsxs("div",{className:"w-[300px] h-60 mt-6 flex flex-col",children:[e.jsx("h5",{className:"mb-2 text-base font-sans  font-semibold tracking-tight text-gray-900 mt-1",children:u}),e.jsxs("h5",{className:"mb-2 text-base font-sans  font-semibold tracking-tight text-gray-900 mt-1",children:["Seller Type: ",$]}),e.jsx("h5",{className:"mb-2 text-base font-sans  font-semibold tracking-tight text-gray-900 mt-1",children:_}),e.jsx("button",{className:"mt-5 w-30 transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover:bg-[#870e4d] duration-300 text-white px-4 py-2 border rounded flex flex-row justify-center",onClick:W,children:"Verify & Approve"})]})]})]}),e.jsx(ne,{position:"bottom-center",reverseOrder:!1})]})},Ce=()=>{const a=ce(),s=new URLSearchParams(a.search).get("Id"),[l,d]=r.useState([]);return console.log(s,"single"),r.useEffect(()=>{ge.get("/getsingleproperty?id="+s).then(t=>{console.log(t.data.propertydata,"jobdetails"),d(t.data.propertydata)}).catch(t=>{console.error(t.message)})},[s]),e.jsx(p,{children:l.map(t=>{var o;return e.jsx(ke,{proId:t._id,title:t.title,location:t.location,image:t.image,date:t.date,bathrooms:t.bathrooms,bedrooms:t.bedrooms,price:t.price,Id:(o=t.userId)==null?void 0:o._id,username:t.userId.name,userimg:t.userId.image,phone:t.userId.phone,features:t.features,description:t.description,floorplans:t.floorplans,sellertype:t.sellertype,email:t.userId.email},t.id)})})},Ee=()=>e.jsxs(de,{children:[e.jsx(j,{path:"dashboard",element:e.jsx(je,{})}),e.jsx(j,{path:"user",element:e.jsx(be,{})}),e.jsx(j,{path:"listed",element:e.jsx(we,{})}),e.jsx(j,{path:"unlisted",element:e.jsx(ve,{})}),e.jsx(j,{path:"details",element:e.jsx(Ce,{})})]});export{Ee as default};