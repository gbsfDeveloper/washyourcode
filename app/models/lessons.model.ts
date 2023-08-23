import {Document,Schema,Types, model} from 'mongoose'

export interface MainTopic extends Document{
    _id: Types.ObjectId;
    title : String;
    subTopics: Subtopics[]
}

export const mainTopicSchema = new Schema<MainTopic>({
    _id: Types.ObjectId,
    title : String,
    subTopics: Array<Subtopics>
});

export const MainTopicModel = model<MainTopic>(
    'MainTopic',
    mainTopicSchema
)