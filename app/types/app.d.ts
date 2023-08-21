type Topic = {
    title: string,
    subTopics: Subtopics[]
}

type Subtopics = {
    subtitle:string,
    mainText:string,
    imgRouteList:imgPropertiesForTopics[]
}
  
type imgPropertiesForTopics = {
    imgRoute: string,
    language: string,
}