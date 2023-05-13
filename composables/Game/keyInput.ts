import { Ikeys } from "../contracts"

const keys = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown'
} as Ikeys

/**
 * Represents the key inputs
 */
export const useKeyInput = (callback: Function): Ikeys => {
    //change the speed of the snake when key press
    window.addEventListener("keydown", e => {
        callback(e.key as string)
    })

    return keys as Ikeys
}