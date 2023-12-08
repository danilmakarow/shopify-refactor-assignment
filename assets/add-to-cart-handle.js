const addToCardForms = document.querySelectorAll('form[action="/cart/add"]');

const statusMessages = {
  loading: "Loading...",
  success: "Added to Cart ✅",
  defaultError: "Unexpected error",
};

const buttonData = {
  disabledClass: "product-card__button__disabled",
  disabledAttribute: "disabled"
}

addToCardForms.forEach(form =>
    form.addEventListener("submit", async (event) => {
      const {setLoading, setSucceed, setError} = controlButtonMessage(
        form.querySelector(".product-card__button"), statusMessages, buttonData
      )

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
        setError(error.message );
      }
    })
);


const updateProductCounter = (counterElement) => {
  counterElement.forEach(el => el.textContent = Number(el.textContent) + 1);
}

const controlButtonMessage = (buttonElement, messages, buttonDisable) => {
  const originText = buttonElement.textContent

  const resetButton = () => setTimeout(() => {
    buttonElement.textContent = originText;

    buttonElement.removeAttribute(buttonDisable.disabledAttribute);
    buttonElement.classList.remove(buttonDisable.disabledClass);
  }, 2000)

  return {
    setLoading(){
      buttonElement.textContent = messages.loading;

      buttonElement.setAttribute(buttonDisable.disabledAttribute, "");
      buttonElement.classList.add(buttonDisable.disabledClass);
    },
    setSucceed(){
      buttonElement.textContent = messages.success;
      resetButton();
    },
    setError(errorMessage){
      buttonElement.textContent = errorMessage || messages.defaultError;
      resetButton();
    },
  }
}
