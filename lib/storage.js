// Simple in-memory ring buffer for posts pushed via webhook.
// Persists across warm invocations on the same serverless instance.
// For permanent storage, swap this with @vercel/kv later.

const MAX = 30;
let _posts = [];

export const kv = {
  async getPosts() {
    return [..._posts];
  },
  async addPost(post) {
    _posts = [post, ..._posts].slice(0, MAX);
    return _posts.length;
  }
};