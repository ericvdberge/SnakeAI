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
                                {{layer.outputs}}
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
                                    <td>Error</td>
                                    <td>{{ error }}</td>
                                </tr>
                                <tr>
                                    <td>Accuracy</td>
                                    <td>-</td>
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
                                            variant="tonal">
                                                Train Network
                                        </v-btn>
                                    </v-col>
                                </v-row>

                            </v-container>
                        </v-card>
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

const resetNeuralNetwork = () => {
    model.value = useNeuralNetwork({
        structure: [2, 2, 2, 2]
    })
    y_pred.value = model.value.layerStates.map(layerState => layerState.outputs)
    y_true.value = [1, 1, 1, 0]
    error.value = useCategoricalCrossEntropy(y_pred.value, y_true.value)
}

resetNeuralNetwork()




</script>