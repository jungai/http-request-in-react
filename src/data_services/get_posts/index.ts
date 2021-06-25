import ky from "ky";

export function getPosts(client: typeof ky) {
  return () => client.get("https://jsonplaceholder.typicode.com/posts").json();
}
