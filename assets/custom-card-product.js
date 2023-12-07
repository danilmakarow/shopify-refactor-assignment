const addToCardForms = document.querySelectorAll('form[action="/cart/add"]');

addToCardForms.forEach(form =>
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const reposnse = await fetch("/cart/add", {
            method: "POST",
            body: new FormData(form)
        })

        console.log(reposnse)
    })
);
