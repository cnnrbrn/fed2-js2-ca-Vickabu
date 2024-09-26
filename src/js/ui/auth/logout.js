export function onLogout() {
    console.log("Logging out");
    ["accessToken", "userInfo"].forEach(item => localStorage.removeItem(item));
    alert("Logged out");
    window.location.href = "/";
}