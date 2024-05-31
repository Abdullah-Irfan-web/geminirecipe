"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
const page = () => {
    const searchParams=useSearchParams();
    const query=searchParams.get("query");
    // const sections = query.split('\n\n');
    
    // // Assuming sections follow a specific order
    // const [title, ingredients, instructions, tips] = sections;

    // // Convert each section into an array of lines
    // const ingredientList = ingredients.split('\n');
    // const instructionList = instructions.split(/\b\d+\. /);
    // const tipList = tips.split('\n');
    
  return (
    <div>
      {query.split('\n').map(para=>{
       return para &&  (
        <div className="max-w-md mt-2 mx-auto bg-white shadow-md p-6 rounded-lg">
      <p className="text-lg font-semibold mb-4">{para}</p>
    </div>
           
        )
      })}
    </div>
  )
}

export default page
