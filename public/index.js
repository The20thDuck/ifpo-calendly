let button = document.getElementById("btn");
button.onclick = () => {
    if (!!document.getElementById("email").value && !!document.getElementById("password").value) {
        let spinner = document.getElementById("spin");
        spinner.setAttribute("class", "fa fa-spinner fa-spin");
    }
}