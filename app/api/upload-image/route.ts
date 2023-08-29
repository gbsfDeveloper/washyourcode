import { NextResponse,NextRequest } from 'next/server'
import { MainTopicModel } from '@/app/models/topics';
import dbConnect from '@/app/lib/mongodb';
import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import mv from 'mv'
import { IncomingMessage } from 'http';

export async function POST(
  req: IncomingMessage,
  _res: Response
  ) {
    try { 
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()
        
         form.parse(req, (err, fields, files) => {
             if (err) return reject(err)
             console.log(fields, files)
             console.log(files.file)
            //  var oldPath = files.file.filepath;
            //  var newPath = `./public/uploads/${files.file.originalFilename}`;
            //  mv(oldPath, newPath, function(err) {
            //  });
             NextResponse.json({ fields, files });
         })
         NextResponse.json({ message: "NADA" });
     });
     console.log(data);
     
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error has ocurred", topicsData:["adasd"] });
    }
}
