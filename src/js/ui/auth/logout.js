export function onLogout() {
    console.log("Logging out");
    localStorage.removeItem("accessToken");
    alert("Logged out");
    window.location.href = "/auth/login/";
}