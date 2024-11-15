<template>
  <div class="settings">
    <h1>Settings</h1>
    <p>Manage your account settings here.</p>
    <form>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter your username" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Settings',
};
</script>

<style scoped>
.settings {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>