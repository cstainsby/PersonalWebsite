
/** timeout()
 *      a simple sleep function
 */
function timeout(timeInSec: number): Promise<void> {
    const msTime = timeInSec * 1000
    return new Promise(r => setTimeout(r, msTime))
}

export {
    timeout
}