

/** ImageLink   
 *      contains the data for a link which is an image 
 */
interface ImageLink {
    title: string
    imgPath: string
    altText: string
    href: string
}

/** Toast
 *      a notification 
 */
interface Toast {
    id?: number
    type: "success" | "error" | "info"
    message: string
    timeoutTime: number // in ms
}

export type {
    ImageLink,
    Toast,
}