const Url = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  try {
    const response = await axios.get(Url + username);
    const user = response.data;
    createUserCard(user);
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard("No profile with this username");
    } else {
      createErrorCard("An error occurred while fetching the user data");
    }
  }
}

function createUserCard(user) {
  const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";

  const cardHTML = `
    <div class="card">
      <div>
        <img src="${user.avatar_url}" alt="${userID}" class="avatar">
      </div>
      <div class="user-info">
        <h2>${userID}</h2>
        ${userBio}
        <ul>
          <li><strong>Followers:&nbsp;</strong>${user.followers}</li>
          <li><strong>Following:&nbsp;</strong>${user.following}</li>
          <li><strong>Repos:&nbsp;</strong>${user.public_repos}</li>
        </ul>
        <ul>
          <li><strong>Twitter:&nbsp;</strong>${user.twitter_username}</li>
          <li><strong>Location:&nbsp;</strong>${user.location}</li>
        </ul>
      </div>
    </div>
  `;

  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardHTML = `
    <div class="card">
      <h1>${msg}</h1>
    </div>
  `;
  main.innerHTML = cardHTML;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    await getUser(user);
    search.value = "";
  }
});
