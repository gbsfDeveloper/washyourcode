import {Document,Schema,Types, model, models} from 'mongoose'

export interface SubTopic extends Document{
    _id: Types.ObjectId;
    topicId: Types.ObjectId;
    subtitle:string,
    mainText:string,
    imgRouteList:imgPropertiesForTopics[]
}

export const subTopicSchema = new Schema<SubTopic>({
    topicId: Types.ObjectId,
    subtitle : String,
    mainText : String,
    imgRouteList: Array<imgPropertiesForTopics>
},{
    collection:'subtopics'
});

export const SubTopicModel = models.SubTopic ||  model<SubTopic>(
    'SubTopic',
    subTopicSchema
);