<template>
  <div class="home">
    <h1 id="title">{{ title }}</h1>
      <button v-on:click="onRefreshClick()">Refresh</button>
    <template v-if="errorMessage === ''">
      <FucksCounter :loading="fucksGivenLoading" :counter="fucksGiven" ></FucksCounter>
      <div v-if="!fucksHistoryLoading">
        <FucksChart id="chart" :currentFucksGiven="fucksGiven" :loading="fucksHistoryLoading" :fucksHistoryData="fucksHistory" :height="400" :width="600" :styles="{ display: 'inline-block' }"></FucksChart>
      </div>
      <div v-if="!fucksGivenLoading" id="buttonRow">
        <button id="clearButton" v-on:click="onClearClick()">Clear All Fucks</button>
        <button id="updateButton" v-on:click="onUpdateClick()">Shivani just gave fuck(s)</button>
      </div>
      <modal name="update-fucks" height="200px">
        <div id="updateModal">
          <b>Fucks Update</b>
          <p>How many fucks did Shivani just give?</p>
          <input id="fucksCounterInput" type="number" placeholder="fucks given" v-model="extraFucksGiven" />
          <button id="submitButton" v-on:click="onSubmitClick()">Submit Fucks</button>
        </div>
      </modal>
    </template>
    <template v-else>
      <h1 id="errorTitle">Something wrong!!</h1>
      <p id="errorMessage">{{ errorMessage }}</p>
    </template>
  </div>
</template>


<script lang="ts" src="./index.ts" />

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./index.scss" />