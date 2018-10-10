<template>
  <div class="home">
    <h1 id="title">{{ title }}</h1>
    <FucksCounter :counter="fucksGiven" ></FucksCounter>
    <FucksChart id="chart" :fucksHistoryData="fucksHistory" :height="400" :width="600" :styles="{ display: 'inline-block' }"></FucksChart>
  </div>
</template>

<script lang="ts">

</script>

<script lang="ts" src="./index.ts" />

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./index.scss" />