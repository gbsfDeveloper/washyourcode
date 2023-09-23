type Topic = {
    title: string,
    subTopics: Subtopics[]
}

type Subtopics = {
    subtitle:string,
    mainText:string,
    imgRouteList:imgPropertiesForTopics[]
}

type TSubtopicFiles = {
    subtitle:string,
    mainText:string,
    imgs: Array<File | null>
}
  
type imgPropertiesForTopics = {
    imgRoute: string,
    language: string,
}

type TScreenObject = { 
    innerWidth:Number,
    innerHeight:Number 
}