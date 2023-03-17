<template>
    <ClientOnly>
        <div>
            <h1 v-for="layer, index in model.layers" :key="index">
                Output layer {{ index + 1 }}: {{ layer.outputs }}
            </h1>
        </div>
    </ClientOnly>   
</template>

<script setup>
const model = useNeuralNetwork({
    structure: [24, 18, 18, 4]
})
</script>