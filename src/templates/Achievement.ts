export default interface Achievement {
    title: String,
    titleCaption?: String,
    fromWho: String,
    imgPath: String,
    imgAltText: String,
    startDate: Date,
    endDate?: Date
}