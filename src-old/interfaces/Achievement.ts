export default interface Achievement {
    title: String
    educator: String
    shortDescription: String
    timeStart: Date
    timeEnd?: Date  // if endDate missing, assume to be in progress 
}