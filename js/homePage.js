let flag;
// let usersArr = [];

let buttonLogin = document.getElementById("button-login");
buttonLogin.addEventListener("click", function () {
    document.getElementById("login").style.visibility = "visible";
    localStorage.setItem("currentUser", " ");
    document.getElementById("username-login").value = "";
    document.getElementById("email-login").value = "";
    document.getElementById("password-login").value = "";

    document.getElementById("username-sign-up").value = "";
    document.getElementById("email-sign-up").value = "";
    document.getElementById("password-sign-up").value = "";
    document.getElementById("ensure-password-sign-up").value = "";

    document.getElementById("hi").innerHTML = " ";
    flag = false;
})

let linkSignUp = document.getElementById("link-sign-up");
linkSignUp.addEventListener("click", function () {
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("sign-up").style.visibility = "visible";
});

let linkLogin = document.getElementById("link-login");
linkLogin.addEventListener("click", function () {
    document.getElementById("login").style.visibility = "visible";
    document.getElementById("sign-up").style.visibility = "hidden";
});

function newUser(e) {
    let userName = document.getElementById("username-sign-up").value;
    let userPassword = document.getElementById("password-sign-up").value;
    let ensureUserPassword = document.getElementById("ensure-password-sign-up").value;
    let userEmail = document.getElementById("email-sign-up").value;
    if (userName === "" || userEmail === "" || ensureUserPassword === "" || userPassword === "") {
        alert("יש למלא את כל הפרטים");
        return;
    }

    let emailValidation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!emailValidation.test(userEmail)) {
        alert("כתובת המייל אינה תקינה");
        return;
    }

    if (userPassword.length < 6) {
        alert("הכנס סיסמה באורך של 6 תווים לפחות");
        return;
    }

    let PswNotValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let result = PswNotValid.test(userPassword);
    if (!PswNotValid.test(userPassword)) {
        alert("סיסמא חייבת לכלול: תו, אות ומספר.");
        return;
    }

    if (userPassword !== ensureUserPassword) {
        alert("הסיסמאות אינן תואמות");
        return;
    }

    for (let i = 0; i < localStorage.length; i++) {
        let userData = JSON.parse(localStorage.getItem(userEmail));
        if (userData) {
            alert("משתמש קיים");
            document.getElementById("login").style.visibility = "visible";
            document.getElementById("sign-up").style.visibility = "hidden";

            document.getElementById("username-login").value = userName;
            document.getElementById("email-login").value = userEmail;
            document.getElementById("username-sign-up").value = "";
            document.getElementById("email-sign-up").value = "";
            document.getElementById("password-sign-up").value = "";
            document.getElementById("ensure-password-sign-up").value = "";

            return;
        }
    }

    let user = {
        name: userName,
        email: userEmail,
        Password: userPassword,
        ensurePassword: ensureUserPassword,
    };

    localStorage.setItem(userEmail, JSON.stringify(user));
    localStorage.setItem("currentUser", userEmail);

    document.getElementById("sign-up").style.visibility = "hidden";
    document.getElementById("hi").innerHTML = "ברוך הבא " + userName;
    flag = true;
}

function exsistUser(e) {
    let userName = document.getElementById("username-login").value;
    let userEmail = document.getElementById("email-login").value;
    let userPassword = document.getElementById("password-login").value;
    if (userName === "" || userEmail === "" || userPassword === "") {
        alert("יש למלא את כל הפרטים");
        return;
    }

    let user = localStorage.getItem(userEmail);
    if (user) {
        let userData = JSON.parse(localStorage.getItem(userEmail));

        if (userData.email === userEmail) {
            console.log(userData.email);
            if (userData.Password !== userPassword) {
                alert("הסיסמא שגויה");
                return;
            }
            localStorage.setItem("currentUser", userEmail);
            document.getElementById("login").style.visibility = "hidden";
            flag = true;
            document.getElementById("hi").innerHTML = "שלום " + userName;
            return;
        }
    }
    else {
        alert("משתמש חדש, עליך להירשם תחילה");
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("sign-up").style.visibility = "visible";
    
        document.getElementById("username-sign-up").value = userName;
        document.getElementById("email-sign-up").value = userEmail;
        document.getElementById("username-login").value = "";
        document.getElementById("email-login").value = "";
        document.getElementById("password-login").value = "";
    }
}


document.getElementById("bool-game").addEventListener("click", function () {
    if (flag)
        window.location = "./game.html";
})

let additional = document.querySelectorAll(".additional");
for (let i = 0; i < 3; i++) {
    additional[i].addEventListener("click", function () {
        if (flag)
            window.location = "./building.html";
    });
}
document.getElementById("button-save").addEventListener("click", newUser);
document.getElementById("button-enter").addEventListener("click", exsistUser);

