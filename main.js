const config = {
  url: "https://api.recursionist.io/random-user",
  parentId: "target",
};

fetch(config.url)
  .then((res) => res.json())
  .then(function (data) {
    console.log(data);
    afterProcess(data);
  });

function afterProcess() {
  let parent = document.getElementById(config.parentId);
  parent.innerHTML = "";
  parent.innerHTML += `
  <div class="col-10 mt-3 d-flex justify-content-end">
    <button class="btn btn-secondary new-data-btn">New Data!</button>
  </div>
  `;

  parent
    .querySelectorAll(".new-data-btn")[0]
    .addEventListener("click", function () {
      fetch(config.url)
        .then((res) => res.json())
        .then(function (data) {
          parent.append(generateUserCard(data));
        });
    });

  parent.append(generateUserCard(data));
}

function generateUserCard(user) {
  let userDataHTML = document.createElement("div");
  userDataHTML.innerHTML =
  `
    <div class="col-12 d-flex justify-content-center outer-card m-3">
      <div class="d-flex align-items-center col-md-7 col-10 m-1">
        <div class="d-flex col-12 profile-card">
          <div class="col-8 py-3">
            <h4>${getFullName(user.firstName,user.lastName)}</h4>
            <div class="py-2"><p>Site: ${user.website}</p></div>
            <div class="py-2"><p>Birthday: ${user.birthday} </p></div>
            <div class="py-2"><p>Occupation: ${user.occupation}</p></div>
            <div class="py-2"><p>Biography: ${user.bio}</p></div>
            <div class="py-2"><p>Skill set: ${joinWords(user.skills,",")}</p></div>
          </div>
          <div class="col-4 d-flex justify-content-center align-items-center">
            <div>
              <img class="avatar" src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return userDataHTML;
}
function getFullName(firstName, lastName){
  return firstName + " " + lastName;
}
function joinWords(stringArr, delimiter) {
  if (stringArr.length == 0) return "";

  let string = "";
  let length = stringArr.length;

  for (let i = 0; i <= length - 2; i++) {
    string += stringArr[i] + delimiter;
  }
  return string + stringArr[length - 1];
}
