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
      const file = formData.get('file');

      if(!file){
        return NextResponse.json({ error:false, message: "You need to upload a file"}, { status: 400 });
      }

      const fileRoute = formData.get('fileRoute');
      const DINAMIC_ROUTE = fileRoute ? `/${fileRoute}` : ``;
      const SAVE_FOLDER = `public/assets/imgs${DINAMIC_ROUTE}`;
      const existFolder = fs.existsSync(SAVE_FOLDER);
      
      if(!existFolder){
        await fsp.mkdir(SAVE_FOLDER);
      }

      const fileAsBlob = file as Blob;
      const fileArrayBuffer = await fileAsBlob.arrayBuffer();
      const buffer = Buffer.from( fileArrayBuffer );
      fsp.writeFile(`${SAVE_FOLDER}/${fileAsBlob.name}`, buffer);

      return NextResponse.json({ error:false, message: "File successful uploaded"}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error:true, message: `Error has ocurred ${error}` }, { status: 500 });
    }
}
