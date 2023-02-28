const keys = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown'
}

/**
 * Represents the key inputs
 */
export const useKeyInput = (callback) => {
    //change the speed of the snake when key press
    window.addEventListener("keydown", e => {
        callback(e.key)
    })

    return keys
}