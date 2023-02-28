<template>
    <h1>
        layer1 (input): {{layer1}}
        <br>
        layer2: {{layer2}}
        <br>
        layer3: {{layer3}}
        <br>
        layer4 (output): {{layer4}}
    </h1>
</template>

<script setup>
const neuralNetwork = useNeuralNetwork()
const layer1 = neuralNetwork.createLayer(50, 18)
const layer2 = neuralNetwork.createLayer(18, 18)
const layer3 = neuralNetwork.createLayer(18, 18)
const layer4 = neuralNetwork.createLayer(18, 4)


</script>