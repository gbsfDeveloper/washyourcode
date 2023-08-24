import {Document,Schema,Types, model, models} from 'mongoose'

export interface MainTopic extends Document{
    _id: Types.ObjectId;
    title : String;
    subTopics: Subtopics[]
}

export const mainTopicSchema = new Schema<MainTopic>({
    title : String,
    subTopics: Array<Subtopics>
});

export const MainTopicModel = models.MainTopic ||  model<MainTopic>(
    'MainTopic',
    mainTopicSchema
);