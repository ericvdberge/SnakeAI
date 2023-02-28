let playGround = null

let sensor = {
    reach: 50,
    position: {
        bottomLeft: 0,
        bottomRight: 0,
        topLeft: 0,
        topRight: 0,
    }
}   

export const useSensor = () => {
    setup()

    return {
        draw,
        update
    }
}

/**
 * Calculates the values of the sensor
 */
const update = () => {
    const snake = useState('snake').value
    const { x, y } = snake.head.position
    sensor.position = {
        bottomLeft: {
            from: x - sensor.reach,
            to: y + snake.size + sensor.reach,
        },
        bottomRight: {
            from: x + snake.size + sensor.reach,
            to: y + snake.size + sensor.reach
        },
        topLeft: {
            from: x - sensor.reach,
            to: y - sensor.reach
        },
        topRight: {
            from: x + snake.size + sensor.reach,
            to: y - sensor.reach
        } 
    }
    useState("sensor", _ => sensor)
}

/**
 * Setup the sensor object
 */
const setup = () => {
    playGround = useState('playGround').value
}

const draw = () => {
    const snake = useState('snake').value
    const {x, y} = snake.head.position

    playGround.strokeStyle = "#fff"
    playGround.beginPath()

    //Our neural network needs 16 inputs:
    /**
     * left top
     */
    playGround.moveTo(x, y) //start pos
    playGround.lineTo(sensor.position.topLeft.from, sensor.position.topLeft.to)
    playGround.stroke()

    /**
     * right top
     */
    playGround.moveTo(x + snake.size, y) //start pos
    playGround.lineTo(sensor.position.topRight.from, sensor.position.topRight.to)
    playGround.stroke()

    /**
     * right bottom
     */
    playGround.moveTo(x + snake.size, y + snake.size) //start pos
    playGround.lineTo(sensor.position.bottomRight.from, sensor.position.bottomRight.to) //bottom right
    playGround.stroke()

    /**
     * left bottom
     */
    playGround.moveTo(x, y + snake.size) //start pos
    playGround.lineTo(sensor.position.bottomLeft.from, sensor.position.bottomLeft.to) //bottom right
    playGround.stroke()
}