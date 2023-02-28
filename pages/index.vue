<template>
  <div>
    <canvas 
      ref="canvas"
    />
    <p>Score: {{ score }}</p>
    <p>{{ developerMode ? 'Development mode' : "Normal mode" }}</p>
    <button @click="switchMode">switch to {{ developerMode ? "Normal mode" : 'Development mode' }}</button>
  </div>
</template>

<script setup>
  const canvas = ref()
  let score = ref(0)
  let developerMode = ref(true)

  const switchMode = () => developerMode.value = !developerMode.value

  onMounted(_ => {
    const game = useGame(canvas.value)
    const snake = useSnake()
    const apple = useApple()
    const sensor = useSensor()

    //the game loop
    game.play(_ => { 
      sensor.update()

      snake.draw()
      apple.draw()

      if(developerMode.value)
        sensor.draw()

      //move the snake
      snake.move()

      //check if the snake has eaten an apple
      if(snake.hasEatenApple())
      {
        apple.replace()
        score.value += 1
      }

      //reset the game when we are game over 
      if(game.isGameOver()) 
      {
        game.reset()
        score.value = 0
      }
    })
  })
</script>