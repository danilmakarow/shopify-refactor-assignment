const addToCardForms = document.querySelectorAll('form[action="/cart/add"]');

const statusMessages = {
  loading: "Loading...",
  success: "Added to Cart ✅",
  defaultError: "Unexpected error",
}

addToCardForms.forEach(form =>
    form.addEventListener("submit", async (event) => {
      const {setLoading, setSucceed, setError} = controlButtonMessage(form.querySelector(".product-card__button"), statusMessages)

      try {
        event.preventDefault();

        setLoading()

        await fetch("/cart/add", {
          method: "POST",
          body: new FormData(form)
        })

        setSucceed();
        updateProductCounter(document.querySelectorAll(".cart-count-bubble span"));
      } catch (error) {
        console.log(error)
        setError(error.message );
      }
    })
);


const updateProductCounter = (counterElement) => {
  counterElement.forEach(el => el.textContent = Number(el.textContent) + 1);
}

const controlButtonMessage = (buttonElement, messages) => {
  const originText = buttonElement.textContent

  const resetButtonText = () => setTimeout(() => buttonElement.textContent = originText, 3000)

  return {
    setLoading(){
      buttonElement.textContent = messages.loading
    },
    setSucceed(){
      buttonElement.textContent = messages.success
      resetButtonText()
    },
    setError(errorMessage){
      buttonElement.textContent = errorMessage || messages.defaultError
      resetButtonText()
    },
  }
}
