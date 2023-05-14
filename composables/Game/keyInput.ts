import { IKeys } from "../contracts"

const keys: IKeys = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown'
}

/**
 * Represents the key inputs
 */
export const useKeyInput = (callback: Function): IKeys => {
    //change the speed of the snake when key press
    window.addEventListener("keydown", e => {
        callback(e.key as string)
    })

    return keys as IKeys
}