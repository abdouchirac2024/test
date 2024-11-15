<template>
  <div class="messages">
    <h1>Messages</h1>
    <p>Welcome to your messages page!</p>
    <ul>
      <li>Message 1: Hello, how are you?</li>
      <li>Message 2: Don't forget our meeting tomorrow.</li>
      <li>Message 3: Your profile has been updated.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Messages',
};
</script>

<style scoped>
.messages {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>