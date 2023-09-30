import { NextResponse, NextRequest } from 'next/server'
import { MainTopicModel } from '@/app/models/topics';
import dbConnect from '@/app/lib/mongodb';
import { IncomingForm } from 'formidable'
import fs, { promises as fsp } from 'fs'
import mv from 'mv'
import type { IncomingMessage } from 'node:http';
import { SubTopicModel } from '@/app/models/subtopics';
// import type { IncomingMessage } from 'http';

export async function POST(
  req: NextRequest,
  _res: NextResponse
  ) {
    try {

      await dbConnect();
      
      const formData = await req.formData();
      const topicTitle = formData.get('title') as unknown as string;
      const topicSavedObject = await MainTopicModel.create({
        title: topicTitle,
        subTopics:[]
      });
      const topicId = topicSavedObject._id;
      
      const subtopicsLenght = formData.get('subtopicsLenght') as unknown as number;

      for (let index = 0; index < subtopicsLenght; index++) {
        const subtitle = formData.get(`subtitle_${index}`) as unknown as string;
        const mainText = formData.get(`mainText_${index}`) as unknown as string;
        let imgRouteList:imgPropertiesForTopics[] = [];
        const actualSubtopicObject = {
          topicId,
          subtitle,
          mainText,
          imgRouteList
        }
        const subtopicSavedObject = await SubTopicModel.create(actualSubtopicObject);
        const subjectId = subtopicSavedObject._id;
        const actualFile = formData.get(`file_${index}`);
        const DINAMIC_ROUTE = subjectId ? `/${subjectId}` : ``;
        const SAVE_FOLDER = `public/assets/imgs${DINAMIC_ROUTE}`;
        const existFolder = fs.existsSync(SAVE_FOLDER);
        if(!existFolder){
          await fsp.mkdir(SAVE_FOLDER);
        }
        const fileAsBlob = actualFile as Blob;
        const fileNameList = fileAsBlob.name.split(".");
        let dinamicNumber = 0;
        let fileNewName = `img_${dinamicNumber}`;
        const fileExtention = fileNameList[1];
        let imgPath = `${SAVE_FOLDER}/${fileNewName}.${fileExtention}`;
        while (fs.existsSync(imgPath)) {
          dinamicNumber += 1;
          fileNewName = `img_${dinamicNumber}`;
          imgPath = `${SAVE_FOLDER}/${fileNewName}.${fileExtention}`;
        }
        const fileArrayBuffer = await fileAsBlob.arrayBuffer();
        const buffer = Buffer.from( fileArrayBuffer );
        fsp.writeFile(imgPath, buffer);
        subtopicSavedObject.imgRouteList.push({
          imgRoute: imgPath,
          language: "Javascript (JS)",
        })
        subtopicSavedObject.save();
        topicSavedObject.subTopics.push(subjectId);
        topicSavedObject.save();
      }
      return NextResponse.json({ error:false, message: "File successful uploaded"}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error:true, message: `Error has ocurred ${error}` }, { status: 500 });
    }
}
