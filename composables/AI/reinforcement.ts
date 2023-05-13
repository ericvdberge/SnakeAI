const states = {
    //TODO: change please
}

const actions = {
    //TODO: change please
}

const rewards = {
    //TODO: change please
}

/**
 * 
 * @param environment 
 */
export const useReinforcementLearning = (environment) => {
    const { reward, state } = interperter(environment)
    const action = agent(reward, state)
    return action

}

/**
 * 
 * @param environment 
 * @returns 
 */
const interperter = (environment) => {
    let reward = 0 //TODO: change please
    let state = {} //TODO: change please
    return {
        reward: reward,
        state: state
    }
}

/**
 * 
 * @param reward 
 * @param state 
 * @returns 
 */
const agent = (reward, state) => {
    let action = "" //TODO: change please
    return {
        action: action
    }
}

const useQLearning = () => {
    const hyperParams = {
        quality: 0,
        learningRate: 0,
        reward: 0,
        discountFactor: 0,
        estimateOptimalFuture: 0,
    }
}

const calculateError = () => {

}