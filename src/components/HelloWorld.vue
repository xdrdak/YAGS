<template>
  <div class="hello">
    <div class="container">
      <h2>Simple Grid - Equal Column Size</h2>
      <form class="w-100">
        <div class="measure">
          <label for="name" class="f6 b db mb2">
            Columns
            <span class="normal black-60">(how many columns in a grid?)</span>
          </label>
          <select id="borderRadius" class="ba b--black-20 pa2 mb2 db w-100" v-model="columns">
            <option :key="i" v-for="(_, i) in Array(12).fill(0)">{{i+1}}</option>
          </select>
        </div>
        <div class="measure">
          <label for="name" class="f6 b db mb2">
            Gutter Size
            <span class="normal black-60">(gap sizes in px)</span>
          </label>
          <input
            class="ba b--black-20 pa2 mb2 db w-100"
            type="number"
            min="0"
            max="100"
            v-model="gutterPx"
            placeholder="edit me"
          >
        </div>
      </form>
    </div>
    <div class="container">
      <div class="inspector-selector">
        <label for="grid">Grid Sample</label>
        <input type="radio" id="displayGrid" v-bind:value="false" v-model="displayCode">
        <label for="code">Code Snippet</label>
        <input type="radio" id="displayCode" v-bind:value="true" v-model="displayCode">
      </div>
      <div v-show="displayCode === false" class="grid">
        <div
          :key="index"
          v-for="(item, index) in Array(totalGridItems).fill(0)"
          class="grid__item"
        >
          <div class="item">
            {{index + 1}}
          </div>
        </div>
      </div>
      <div v-show="displayCode === true" >
        <pre id="stylesheetOutput" class="br3 bg-black-90 pa3 light-green"></pre>
      </div>
    </div>
  </div>
</template>

<script>
import buildGrid from '@/style-generators/grid';

let stylesheet = null;

export default {
  name: 'HelloWorld',
  data() {
    return {
      totalGridItems: 24,
      columns: 3,
      gutterPx: 15,
      displayCode: false,
    };
  },
  mounted() {
    stylesheet = document.createElement('style');
    stylesheet.innerHTML = `
      ${buildGrid({ gutterPx: this.gutterPx, columns: this.columns })}
    `;
    // WebKit hack :(
    document.head.appendChild(stylesheet);
    // Add the <style> element to the page
    stylesheet.appendChild(document.createTextNode(''));
    document.getElementById('stylesheetOutput').innerHTML = stylesheet.innerHTML.trim();
  },
  updated() {
    stylesheet.innerHTML = `
      ${buildGrid({ gutterPx: this.gutterPx, columns: this.columns })}
    `;
    document.getElementById('stylesheetOutput').innerHTML = stylesheet.innerHTML.trim();
  },
  destroyed() {
    // Need to cleanup our custom stylesheet
    if (stylesheet) {
      stylesheet.parentNode.removeChild(stylesheet);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.container {
  max-width: 920px;
  margin: 0 auto;
}

.item {
  background-color: #42b983;
  padding: 20px;
  text-align: center;
}
</style>
