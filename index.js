
const username = process.argv[2];
if (username === "") {
    console.log("invaild User Name");
    process.exit(1);
}
else {
     fetchGitHub(username);
 };
async function fetchGitHub(username) {
    try {
        const resp = await fetch(`https://api.github.com/users/${username}/events`);
        const data = await resp.json();
        displayData(data);
    }
    catch (error) {
        console.log("Error: ", error);
    }
};

function displayData(data) {
    data.forEach(event => {
        let action;
        switch (event.type) {
            case "PushEvent":
                const commitCount = event.payload.commits.length;
                action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
                break;
            case "IssuesEvent":
                action = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} an issue in ${event.repo.name}`;
                break;
            case "WatchEvent":
                action = `Starred ${event.repo.name}`;
                break;
            case "ForkEvent":
                action = `Forked ${event.repo.name}`;
                break;
            case "CreateEvent":
                action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                break;
            default:
                action = `${event.type.replace("Event", "")} in ${event.repo.name}`;
                break;
        }
        console.log(`- ${action}`);
    });
};


