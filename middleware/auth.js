export default async function ({ $localForage, redirect }) {
  // If the user is not authenticated
  const user = await $localForage.getItem("loggedUser");
  if (!user) {
    return redirect("/login");
  }
}
