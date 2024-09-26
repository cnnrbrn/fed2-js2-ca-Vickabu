export function getLoggedInUserName() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo?.name;
}