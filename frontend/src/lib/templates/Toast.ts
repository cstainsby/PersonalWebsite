
/** Toast
 *      a notification 
 */
export interface Toast {
    id?: number
    type: "success" | "error" | "info"
    message: string
    timeoutTime: number // in ms
}