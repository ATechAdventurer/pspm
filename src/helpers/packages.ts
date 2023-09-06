export function isGithubURL(url: string) {
  const regex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;
  return regex.test(url);
}
