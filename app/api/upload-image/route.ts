import { NextResponse, NextRequest } from 'next/server'
import { MainTopicModel } from '@/app/models/topics';
import dbConnect from '@/app/lib/mongodb';
import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import mv from 'mv'
import type { IncomingMessage } from 'node:http';
// import type { IncomingMessage } from 'http';

export async function POST(
  req: NextRequest,
  // res: NextResponse
  ) {
    try {

      const formData = await req.formData();
      const file = formData.get('file');
      if(file){
        console.log(file);
        console.log(typeof formData.values());
        // const fileBuffer = new Blob([file]);
        const fileBuffer = file as Blob;
        const buffer = Buffer.from(await fileBuffer.arrayBuffer());
        fs.writeFile(`public/${fileBuffer.name}`, buffer);
      }

      // FOR MULTIPLE FILES
      // const formDataEntryValues = Array.from(formData.values());
      // for (const formDataEntryValue of formDataEntryValues) {
      //   if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
      //     const file = formDataEntryValue as unknown as Blob;
      //     const buffer = Buffer.from(await file.arrayBuffer());
      //     fs.writeFile(`public/${file.name}`, buffer);
      //   }
      // }

      return NextResponse.json({ error:false, message: "File successful uploaded"}, { status: 200 });
    } catch (error) {
      // console.log(error);
      return NextResponse.json({ error:true, message: "Error has ocurred" + error}, { status: 500 });
    }
}
