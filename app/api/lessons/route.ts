import mongoose from 'mongoose' 
import { NextResponse,NextRequest } from 'next/server'
import { MainTopicModel } from '@/app/models/lessons.model';
import dbConnect from '@/app/lib/mongodb';

export async function GET(
  _req: NextRequest,
  _res: Response
  ) {
    try { 
      await dbConnect();
      const topicsData = await MainTopicModel.find({}).limit(500);
      return NextResponse.json({ message: "Data founded", topicsData });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error has ocurred", topicsData:["adasd"] });
    }
}
