const dashboardBtnHandler = async (event) => {
    console.log("this is probably working")
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
    document.location.replace('/dashboard');
  };

document.querySelector('#dashboard').addEventListener('click', dashboardBtnHandler);