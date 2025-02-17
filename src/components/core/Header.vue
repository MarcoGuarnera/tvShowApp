<script lang="ts" setup></script>
<template>
  <header class="header-container">
    <nav>
      <div>
        <router-link class="logo" to="/">
          <img src="@/assets/vue.svg" alt="Logo" class="logo" />
          <h1>TV Show Application</h1>
        </router-link>
      </div>

      <ul>
        <li>
          <router-link to="/shows">Home</router-link>
        </li>
        <li>
          <router-link to="/search">Search</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-image: linear-gradient(-296deg, #005e5d, #00857a);
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #fff;
  display: inline-block;
  padding: 0.75rem 1.5rem;
}

a:active,
a:hover,
a.router-link-active {
  background-color: #004c4c;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

.header-container {
  top: 0;
  left: 0;
  position: fixed;
}

header nav {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

img {
  padding: 10px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
