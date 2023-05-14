import { IPlayGround, ISnake } from "../contracts"

let playGround: IPlayGround | null;

let sensor = {
    reach: 50,
    position: {
        bottomLeft: {from: 0, to: 0},
        bottomRight: {from: 0, to: 0},
        topLeft: {from: 0, to: 0},
        topRight: {from: 0, to: 0},
    }
}   

export const useSensor = () => {
    setup()

    return {
        draw,
        update
    }
}

interface StatePosition {
    from: number,
    to: number
}

interface SensorPosition {
    bottomLeft: StatePosition
    bottomRight: StatePosition
    topLeft: StatePosition
    topRight: StatePosition
}

/**
 * Calculates the values of the sensor
 */
const update = () => {
    const snake = useState('snake').value as ISnake
    const { x, y } = snake.head
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
    } as SensorPosition;
    useState("sensor", () => sensor)
}

/**
 * Setup the sensor object
 */
const setup = () => {
    playGround = useState('playGround').value as IPlayGround
}

const draw = () => {
    if(playGround == null) return

    const snake = useState('snake').value as ISnake
    const {x, y} = snake.head

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