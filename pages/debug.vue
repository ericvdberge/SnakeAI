<template>
    <ClientOnly>
        <v-container>
            <v-row no-gutters>
                <v-col sm="12">
                    <v-sheet class="ma-2 pa-2">
                        <h1>AI Snake - Neural Network</h1>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col
                    v-for="(layer, index) in model.layerStates"
                    :key="layer"
                    cols="12"
                    sm="12"
                >
                    <v-sheet class="ma-2 pa-2">
                        <v-card :title="`Neural Network Layer ${index}`" variant="tonal">
                            <v-card-text class="text-body-1">
                                {{layer.outputs[0]}}
                            </v-card-text>
                        </v-card>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row nogutted>
                <v-col sm="5">
                    <v-sheet class="ma-2 pa-2">
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-left w-50">Metric</th>
                                    <th class="text-left w-50">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Loss</td>
                                    <td>{{ error }}</td>
                                </tr>
                                <tr>
                                    <td>Accuracy</td>
                                    <td>{{ accuracy }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-sheet>
                </v-col>
                <v-col sm="7">
                    <v-sheet class="ma-2 pa-2">
                        <v-card>
                            <v-container fluid>
                                <v-row>
                                    <v-col md="5">
                                        <v-img
                                            src="/ai-human2.jpg"
                                            width="350px"
                                            height="200px"
                                            cover
                                        ></v-img>
                                    </v-col>
                                    <v-col md="7">
                                        <h2 class="mb-4">Tools</h2>
                                        <v-btn 
                                            color="blue" 
                                            rounded="md" 
                                            size="large" 
                                            class="mt-2" 
                                            variant="tonal" 
                                            @click="resetNeuralNetwork">
                                                Reset Network
                                        </v-btn>
                                        <v-btn
                                            color="blue"
                                            rounded="md"
                                            size="large"
                                            class="mt-2 ml-2"
                                            variant="tonal"
                                            @click="() => {trainModel(); makePlot()}">
                                                Train Network
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="5">
                    <v-sheet class="ma-2 pa-2">
                        <div id="loss_graph">

                        </div>
                    </v-sheet>
                </v-col>
                <v-col sm="5">
                    <v-sheet class="ma-2 pa-2">
                        <div id="accuracy_graph">

                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
        
    </ClientOnly>   
</template>

<script setup>
let model = ref({})
let y_pred = ref([])
let y_true = ref([])

let error = ref(0)
let accuracy = ref(0)

const resetNeuralNetwork = async () => {
    const X = await $fetch('/X.json')

    //create neural network
    model.value = useNeuralNetwork({
        structure: [3]
    }, X)    
}

const lossHistory = ref([])
const accuracyHistory = ref([])

await resetNeuralNetwork()
const {softmaxActivation} = useActivationFunction()

const trainModel = async () => {
    const y = await $fetch('/y.json')
    let dense1 = model.value.layers[0]
    const activation1 = softmaxActivation()
    Array.from({ length: 5_000 }, (_, index) => index + 1).forEach(epoch => {
        let dense1Forward = dense1.forward()
        let dense1Output = dense1Forward.outputs
        dense1Output = activation1.forward(dense1Output)

        //get the predicted  and true values
        y_pred.value = dense1Output
        y_true.value = y

        //calculate loss and accuracy
        const lossMethod = useCategoricalCrossEntropy() 
        const loss = lossMethod.forward(y_pred.value, y_true.value)
        const acc = useAccuracy(y_pred.value, y_true.value)

        lossHistory.value = [...lossHistory.value, loss]
        accuracyHistory.value = [...accuracyHistory.value, acc]
        accuracy.value = acc
        error.value = loss

        if(epoch % 500 == 0) {
            console.log(`
                epoch: ${epoch}
                acc: ${acc}
                error: ${loss}
            `)
        }

        // console.log("activation 1 output:", dense1Output)
        let activation1dvalues = activation1.backward(dense1Output)
        // console.log("activation 1 output after backprop:", activation1dvalues)
        let dense1dvalues = dense1.backward(activation1dvalues)
        // console.log("dense 1 output after backprop:", dense1dvalues)

        //change dense layer with adjusted weights and biases
        const optimizer = useSGDOptimizer()
        dense1 = optimizer.updateParams(
            dense1dvalues.dinputs, 
            dense1Forward.weights, 
            dense1Forward.biases, 
            dense1dvalues.dweights, 
            dense1dvalues.dbiases
        )
    })
}

const makePlot = async () => {
    const Plotly = await import('plotly.js-dist-min')
    console.log("test")
    Plotly.newPlot("loss_graph", /* JSON object */ {
            "data": [
                { 
                    x: Array.from({ length: 10_000 }, (_, index) => index + 1),
                    y: lossHistory.value,
                    type: 'scatter',
                    name: 'loss'
                },
            ],
            "layout": { 
                "title": "loss per epoch",
                "width": 600, 
                "height": 400,
                yaxis: {
                    range: [0, 20],
                    type: 'number',
                    title: 'loss'
                },
                xaxis: {
                    title: 'epochs'
                }
            }
    })

    Plotly.newPlot("accuracy_graph", /* JSON object */ {
        "data": [
            { 
                x: Array.from({ length: 10_000 }, (_, index) => index + 1),
                y: accuracyHistory.value,
                type: 'scatter',
                name: 'accuracy'
            }
        ],
        "layout": { 
            "title": "accuracy per epoch",
            "width": 600, 
            "height": 400,
            yaxis: {
                range: [0, 1],
                type: 'number',
                title: 'accuracy'
            },
            xaxis: {
                title: 'epochs'
            }
        }
    })
}
</script>

<style>
#gd {
    min-width: 300px;
    min-height: 300px;
    width: 100% !important;
    height: 100%;
    padding: 10px;
}
</style>