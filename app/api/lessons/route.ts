import { NextResponse,NextRequest } from 'next/server'
import { MainTopicModel } from '@/app/models/topics';
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
      return NextResponse.json({ message: "An Error has ocurred", topicsData:["adasd"] });
    }
}

export async function POST(
  _req: NextRequest,
  _res: Response
  ) {
    try { 
      await dbConnect();
      // const topicsData = await MainTopicModel.find({}).limit(500);
      await MainTopicModel.create({
        title: '2.1 Nombres con sentido',
        subTopics:[{
          subtitle:'Usar nombres de variables que revelen las intenciones',
          mainText:'Elegir y tomarse el tiempo necesario para darle nombres a las variables a largo plazo ahorrara tiempo de desarrollo y de analisis, la famosa frase cuando desarrolle este codigo dios y yo sabiamos que hacia , ahora solo dios sabe que hace',
          imgRouteList:[{
            imgRoute:'/assets/imgs/section_2_img_1.png',
            language:'Javascrip (JS)'
          }]
        }]
      });
      
      return NextResponse.json({ message: "Data created" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error has ocurred", topicsData:["adasd"] });
    }
}