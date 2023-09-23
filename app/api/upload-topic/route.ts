import { NextResponse, NextRequest } from 'next/server'
import { MainTopicModel } from '@/app/models/topics';
import dbConnect from '@/app/lib/mongodb';
import { IncomingForm } from 'formidable'
import fs, { promises as fsp } from 'fs'
import mv from 'mv'
import type { IncomingMessage } from 'node:http';
// import type { IncomingMessage } from 'http';

export async function POST(
  req: NextRequest,
  _res: NextResponse
  ) {
    try {

      const formData = await req.formData();
      // for ( const [key, element] of Array.from(formData) ) {

      // }
      const file = formData.get('file');
      const fileRoute = formData.get('fileRoute');
      const DINAMIC_ROUTE = fileRoute ? `/${fileRoute}` : ``;
      const SAVE_FOLDER = `public/assets/imgs${DINAMIC_ROUTE}`;
      const existFolder = fs.existsSync(SAVE_FOLDER);
      
      if(!existFolder){
        await fsp.mkdir(SAVE_FOLDER);
      }
      
      const fileAsBlob = file as Blob;

      const fileNameList = fileAsBlob.name.split(".");
      let dinamicNumber = 0;

      let fileNewName = `img_${dinamicNumber}`;
      const fileExtention = fileNameList[1];

      while (fs.existsSync(`${SAVE_FOLDER}/${fileNewName}.${fileExtention}`)) {
        dinamicNumber += 1;
        fileNewName = `img_${dinamicNumber}`;
      }

      const fileArrayBuffer = await fileAsBlob.arrayBuffer();
      const buffer = Buffer.from( fileArrayBuffer );
      fsp.writeFile(`${SAVE_FOLDER}/${fileNewName}.${fileExtention}`, buffer);

      return NextResponse.json({ error:false, message: "File successful uploaded"}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error:true, message: `Error has ocurred ${error}` }, { status: 500 });
    }
}
