<template>
    <h1 v-if="!loading" id="counter">{{ counter }}</h1>
    <h1 v-else><img src="https://loading.io/spinners/wave/lg.wave-ball-preloader.gif"></h1>
</template>

<script lang="ts" src="./index.ts" />
<style scoped lang="scss" src="./index.scss" />
