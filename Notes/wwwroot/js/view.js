"use strict";

function updateView() {
    const app = document.getElementById("app");
    app.innerHTML = getPageHTML();
}

function getPageHTML() {
    switch (model.app.currentPage) {
        default:
            return getLoginPageHTML();

    }
}