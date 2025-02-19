<script lang="ts" setup>
import BaseButton from "@/components/base/base-button/BaseButton.vue";
</script>

<template>
  <header class="header-container">
    <nav>
      <div class="logo-container">
        <router-link class="logo" to="/">
          <img src="@/assets/vue.svg" alt="Logo" />
          <h1>TV Show Application</h1>
        </router-link>
      </div>
      <ul class="nav-links">
        <li>
          <BaseButton link mode="outline" to="/shows">Dashboard</BaseButton>
        </li>
        <li>
          <BaseButton link mode="outline" to="/search">Search</BaseButton>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header-container {
  width: 100%;
  background-image: linear-gradient(-296deg, #005e5d, #00857a);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
  margin-bottom: 20px;
}

header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  padding: 6px;
}

.logo img {
  padding: 10px;
}

.nav-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0 0.5rem;
}

a:active,
a:hover,
a.router-link-active {
  background-color: #004c4c;
}

@media (max-width: 600px) {
  header nav {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .logo-container {
    margin-bottom: 10px;
  }

  .nav-links {
    align-items: center;
    gap: 20px;
  }

  .nav-links li {
    margin: 5px 0;
  }
}
</style>
