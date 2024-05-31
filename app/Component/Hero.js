
'use client'
import React,{ useState } from 'react'
import pic from '../Component/breakfast.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { MdOutlineInsertPhoto,} from "react-icons/md"
// API= 
const Hero = () => {
  const router =useRouter();
  const [imageId, setImagePublicId]=useState("");
  const [data,setData]=useState({
    image:"",
    ingredients:[],
    cuisine:[]
  })
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [typelist,settypeList]=useState(['Italian', 'French', 'Chinese', 'Continental', 'Indian','Japanese','Mexican','Thai','American','Turkish','Mediterian'])
 
  const [list,setList]=useState(['Oil', 'Butter', 'Salt', 'Pepper', 'Spices','Flour','Vinegar','Milk','Sugar'])
  
  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(

      {
        cloudName: "dac2viawa",
        uploadPreset: "wkhqhjpw"
      },
      async (error, result) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "image"
        ) {
          console.log(result.info);
          setImagePublicId(`https://res.cloudinary.com/dac2viawa/image/upload/v${result.info.version}/${result.info.public_id}.${result.info.format}`)
         
        
          const response = await fetch(`/api/dwnl`,{
            method:'POST',
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify(`https://res.cloudinary.com/dac2viawa/image/upload/v${result.info.version}/${result.info.public_id}.${result.info.format}`)

          })
         
          const d=await response.json();
          console.log(d);
          if(response.ok){
            console.log('Image downloaded successfully!');
          }
          // setFormdata({...formdata,image:`https://res.cloudinary.com/dac2viawa/image/upload/v${result.info.version}/${result.info.public_id}.${result.info.format}`})
        }
      }
    );
    widget.open(); // open up the widget after creation
  };
  const handleSkillClick = (skill) => {

    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);

    }
  };

  const handleInputChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAddSkill = () => {
    list.push(newSkill);
    if (newSkill.trim() !== '') {

      setList(list)
      setNewSkill('');
    }
  }
  const removeskill=(skill)=>{
    console.log(skill)
   setList( list.filter(s=>s!==skill))
  }
  const [selectedtypes, setSelectedtypes] = useState([]);
  const [newtype, setNewtype] = useState('');
  const handletypeClick = (type) => {

    if (selectedtypes.includes(type)) {
      setSelectedtypes(selectedtypes.filter(s => s !== type));
    } else {
      setSelectedtypes([...selectedtypes, type]);
    }
  };
  const handleAddtype = () => {
    typelist.push(newtype);
    if (newtype.trim() !== '') {

      settypeList(typelist)
      setNewtype('');
    }
  }
  const createQuery=(name,value)=>{
    const param=new URLSearchParams();
    param.set(name,value);
    return param.toString();
  }
const search=async()=>{

  
   
  const response=await fetch('/api/gemini',{
      method:'POST',

      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
  
    ingredients:selectedSkills,
    cuisine:selectedtypes
      })
      
    })
    const res=await response.json();
    console.log(res);
    router.push("/recipe"+"?"+createQuery("query",res.text));


}
  return (
    <section className="text-gray-600 -mt-[13px] bg-gray-100 body-font">
<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
  <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"> What To Cook Today?
      <br className="hidden lg:inline-block"/>
          Search Here
    </h1>
    <p className="mb-8 leading-relaxed">Welcome to RecipeFinder, your ultimate culinary companion! Our user-friendly platform simplifies the search for delectable recipes by offering a vast collection accessible through a single search. Upload photos and get recipes </p>
    <div className="flex flex-col justify-center">
        <div className='flex'>
   <h1 className='text-2xl mt-1'>Upload picture of your recipe</h1>
   <MdOutlineInsertPhoto onClick={openWidget}  className='ml-4 cursor-pointer' size="40px"/>
   </div>
   {  imageId && <div className='mt-4 ml-4 '>
    <Image src={imageId} height={250} width={300}/>
   </div>}
   <div className='mt-2'>


   <div className="max-w-lg mx-auto w-[90%]">
      <h2 className="text-xl font-bold mt-3 mb-4">Select Other ingredients</h2>
      <div className="mb-8">
       
        <ul className="space-y-2 flex flex-wrap">
          {list.map(skill => (
            <div className='flex'>
            <li
              key={skill} 
              onClick={() => handleSkillClick(skill)}
              className={`cursor-pointer  ml-2 border-2 rounded-full  px-2 ${selectedSkills.includes(skill) ? 'text-blue-600' : ''}`}
            >
              {skill}
              
                        </li>
                       </div>


                         

          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Add a new Ingredient</h3>
        <input 
          type="text" 
          value={newSkill} 
          onChange={handleInputChange} 
          className="border border-gray-300 px-3 py-2 w-full rounded"
        />
        <button 
          onClick={handleAddSkill} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Ingredient
        </button>
      </div>
      
    </div>
  
   </div>
   <div>
   <div className="max-w-lg mx-auto w-[90%]">
      <h2 className="text-xl font-bold mt-3 mb-4">Select Cuisine</h2>
      <div className="mb-8">
       
        <ul className="space-y-2 flex flex-wrap">
          {typelist.map(skill => (
            <div className='flex'>
            <li
              key={skill} 
              onClick={() => handletypeClick(skill)}
              className={`cursor-pointer  ml-2 border-l-2 border-b-2 border-t-2 rounded-full  px-2 ${selectedtypes.includes(skill) ? 'text-blue-600' : ''}`}
            >
              {skill}
              
                        </li>
                                     </div>


                         

          ))}
        </ul>
      </div>
  
      
    </div>
   </div>
  <div>
  <button 
          onClick={search} 
          className="mt-2 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search Recipe
        </button>
  </div>
    </div>
  </div>
  <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6  ">
    <Image height={700} width={820} className="object-cover object-center rounded " alt="hero" src={pic}/>
  </div>
</div>
</section>
  )
}

export default Hero
