<template>
    <ClientOnly>
        <div>
            <h1 v-for="layer, index in layers" :key="index">
                Output layer {{ index + 1 }}: {{ layer }}
            </h1>
        </div>
    </ClientOnly>   
</template>

<script setup>
//imports
const { reluActivation, sofmaxActivation } = useActivationFunction();

//configure the model to start working on it
const configureModel = () => {
    const model = useNeuralNetwork({
        structure: [24, 18, 18, 4]
    })
    return [model, model.options]
}

//generate some iniial input values, 
//because we do not have the sensor working yet.
const generateInputValues = () => {
    let inputs = []
    for(let i = 0; i < structure[0]; i++) {
        const value = Math.random() * 2 - 1
        inputs.push(value)
    }
    return inputs
}

//generate layers based on the model configuration
// maybe later, this should be a function of the model itself
const generateLayers = () => {
    //create model
    const layers = []

    for(let i = 0; i < structure.length; i++)
    {
        const activation = i != structure.length - 1 ? reluActivation : sofmaxActivation
        if(process.server) {
            console.log(activation.name)
        }
        const outputs = model
                .createLayer(inputs, structure[i], activation)
                .map(n => +parseFloat(n).toFixed(2))
        inputs = outputs
        layers.push(inputs)
    }

    return layers
}


let [model, { structure }] = configureModel();
let inputs = generateInputValues();
let layers = generateLayers();
</script>