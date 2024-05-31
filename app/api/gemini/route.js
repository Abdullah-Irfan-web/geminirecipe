
"use server"
import { NextResponse } from "next/server";

import fs from "fs";
import path from 'path';



const { GoogleGenerativeAI } = require("@google/generative-ai");



// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyB3qLT6Ee-J964XkeZGr2SOPpSUpjFK4aI');

function fileToGenerativePart(p, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(p)).toString("base64"),
        mimeType
      },
    };
  }
  
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
   
   
  
  

export async function POST(request){
    const body=await request.json();
    console.log(body);
    let ingre="";
    let cuis="";
    body.ingredients.forEach((ing)=>{
      ingre=ingre+ing+", ";
    })
    body.cuisine.forEach((cu)=>{
      cuis=cuis+cu+", ";
    })
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = "I am providing a image that contains some ingredients. Analyse the image and suggest me a proper recipe that can be made with those ingredients. Also i am attaching some extra ingredients that are "+ingre+" and cuisine is "+cuis;
//console.log(prompt);

const folderPath = 'public/downloads';
   const files=fs.readdirSync(folderPath)


  // Filter out directories, keep only files
   const filename = files.filter((file) => fs.statSync(path.join(folderPath, file)).isFile())[0];
 
 


  const imageParts = [
    fileToGenerativePart("public/downloads/"+filename, "image/"+filename.split(".")[1]),
   
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
    const text=response.text();
  console.log(text);
  
  console.log(filename)
  const imagePath="public/downloads/"+filename;
  console.log(imagePath)
  if (fs.existsSync(imagePath)) {
    // Delete the file
    fs.unlinkSync(imagePath);
  }
  return NextResponse.json({text});
}
 
  
 
  
 


