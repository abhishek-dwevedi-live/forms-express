
const mainFormContainer = document.getElementById("main-form-container");
const topContainer = document.getElementById("top-container");
const formActionContainer = document.getElementById("form-action-container");
const createFormContainer = document.getElementById("createform-container");
const formNavContainer = document.getElementById("form-nav-container");
const email = document.getElementById("user-email");
const FORM_EXPRESS_BACKEND_URL =
    'https://script.google.com/macros/s/AKfycbxS9o184i9LRSjqqnavdtUH9oOkpA556hN729Z_v79yvbygipcWVRoILQjrNjcNePq-/exec?';
const sideContainer = document.getElementById("side-container");
const loginContainer = document.getElementById("login-container");
const previewContainer = document.getElementById("preview-container");
const myFormsContainer = document.getElementById("myforms-container");
// // Event listeners

const textBoxDivHtml = `
<input class="question-field" type="text" placeholder="Untitled Question">
<input class="question-field-description" type="text" placeholder="Enter description.. (optional)">
`;

const submitBtnHtmlString = `
<button class="submit-btn" id="submit-btn" type="submit" value="Create Form">
Create Form
</button>
`;

const requiredElementString = `
<span id="required-text">Required</span>
<label class="switch question-checkbox-label">
<input type="checkbox">
<span class="slider round"></span>
</label>`


// Question Creator Function
function questionCreator(type) {
  let formElement;
  switch (type) {
    case "text":
      formElement = getTextBoxElement();
      break;
    case "checkbox":
      formElement = createMultipleChoiceQuestion('checkbox');
      break;
    case "radio":
      formElement = createMultipleChoiceQuestion('radio');
      break;
    default:
      formElement = getTextBoxElement();
  }
  createFormContainer.insertBefore(formElement, createFormContainer.lastChild);
  addSubmitButton();
}

function getContainerDiv() {
  let elementDiv = document.createElement("div");
  elementDiv.classList.add("form-item", "user-form-item");
  elementDiv.id = `item-${document.getElementsByClassName("user-form-item").length}`;
  return elementDiv;
}

function getTextBoxElement() {
  let textBoxDiv = getContainerDiv();
  textBoxDiv.classList.add("user-form-text-item");
  textBoxDiv.innerHTML = textBoxDivHtml;
  let questionFooter = getQuestionFooter();
  textBoxDiv.appendChild(questionFooter);
  return textBoxDiv;
}

//This function returns a multiple choice question with answers as radio option and allows to add options dynamically
function createMultipleChoiceQuestion(type) {

  let mcContainer = getContainerDiv(); 
  mcContainer.classList.add("ms-container");
  if (type === 'checkbox')
    mcContainer.classList.add("user-form-multiplechoice-item");
  else if (type === 'radio')
    mcContainer.classList.add("user-form-singlechoice-item");

  // Create a form element using the document.createElement() method
  let answerContainerdiv = document.createElement('div');
  answerContainerdiv.classList.add("mc-answer-container")

  // Create an h4 (heading tag) to include the question
  let input = document.createElement('input');
  input.classList.add("question-field");
  input.placeholder = "Untitled Question";
  input.setAttribute("contenteditable", true);

  //Add additional choices in a loop using the choices parameter
  appendMultipleChoice(answerContainerdiv, 1, false, type);
  appendMultipleChoice(answerContainerdiv, 2, false, type);

  // append Heading, form and addOptionButton to the container and return it

 
  mcContainer.appendChild(input);
  mcContainer.appendChild(answerContainerdiv);
  mcContainer.appendChild(getQuestionFooter());

  return mcContainer;
};

function appendMultipleChoice(parentDiv, choiceNo, addDelIcon, type) {
  let div = document.createElement("div");
  div.classList.add(`choice-${choiceNo}`, "ans-choice");
  div.id = `${choiceNo}`;

  // Option Button - radio or checkbox
  let optionButton = document.createElement('input');
  optionButton.type = type;
  optionButton.classList.add("option-button-type");
  optionButton.disabled = true;
  optionButton.name = `choice-${choiceNo}`;
  optionButton.value = `Option-${choiceNo}`;

  //Create label
  let input = document.createElement('input');
  input.type = "text";
  input.classList.add("choice-field");
  input.placeholder = `Option ${choiceNo}`;
  input.addEventListener("focus", (event) => {
    if (parentDiv.children.length <= 3) {
      appendMultipleChoice(parentDiv, parentDiv.children.length + 1, true,type);
    }
  });

  // add crossbutton

  let delSpan = document.createElement("span");
  delSpan.id = `${choiceNo}`;
  delSpan.classList.add("choice-delete-icon");

  delSpan.addEventListener("click", (event) => {
    deleteMultipleChoice(parentDiv, event.target.id);
  })

  div.appendChild(optionButton);
  div.appendChild(input);
  addDelIcon && div.appendChild(delSpan);
  parentDiv.appendChild(div);

}

function deleteMultipleChoice(parentDiv, choiceNo) {
  let intChoice = parseInt(choiceNo) - 1;
  let delChoice = parentDiv.children[intChoice];
  delChoice.remove();
  console.log(delChoice);
}

function addChoice() {
  let choice = document.createElement("input");
  choice.classList.add("chocie-field");
  choice.type = "text";
  choice.placeholder = "choice";

  // TO BE ADDED TO PARENT NODE, NEED TO GENERATE IDs DYNAMICALLY

}

function getQuestionFooter() {

  let questionFooter = document.createElement("div");
  questionFooter.classList.add("question-footer");

  let deleteIcon = document.createElement("img");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.src = 'data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">     <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>   </svg>';

  deleteIcon.addEventListener("click", (event) => {
    let questionId = event.target.parentElement.parentElement.id;
    let element = document.getElementById(questionId);
    element.remove();
    if (useFormItemsSize() == 0) {
      document.getElementById('submit-btn').remove();
    }
  });

  questionFooter.insertAdjacentHTML('beforeend', requiredElementString);
  questionFooter.appendChild(deleteIcon);

  return questionFooter;
}

// Forms Submission & Process

function useFormItemsSize() {
  return document.getElementsByClassName("user-form-item").length;
}

function addSubmitButton() {
  //early return if nothing to do
  if (useFormItemsSize() === 0 || document.getElementById('submit-btn') !== null) return;
  
  
  mainFormContainer.insertAdjacentHTML( 'beforeend', submitBtnHtmlString );
  const submitBtn = document.getElementById('submit-btn');

  function getFormData() {
    let formElements = createFormContainer.querySelectorAll('div.user-form-item');
    let formData = [];
    for (let element of formElements) {
        let formItem = {};
        if (element.classList.contains("user-form-text-item")) {

            const questionLabel = element.getElementsByTagName('input')[0].value;
            const questionDescription = element.getElementsByTagName('input')[1].value;
            formItem['name'] = questionLabel.replace(/\s/g, '');
            formItem['label.value'] = questionLabel;
            formItem['placeholder'] = questionDescription;
            formItem['fieldType'] = '';
            formItem['enum'] = '';
            formItem['enumsNames'] = '';
            formItem['events.click'] = '';
            // formItem['isRequired'] = 'true';
            formData.push(formItem);
        } else if ( element.classList.contains('user-form-singlechoice-item') ) {
            const questionLabel = element.getElementsByTagName('input')[0].value;
            const ansChoices = element.querySelectorAll("div.ans-choice input.choice-field")
            let enumsString = "";
            if (ansChoices !== undefined && ansChoices !== null) {
                ansChoices.forEach( (choice)=>{
                    let inputChoice = choice.value;
                    if ( inputChoice === undefined || inputChoice === null || inputChoice.trim() === '') {
   
                    } else if (enumsString === "") {
                        enumsString += inputChoice.trim();
                    } else {
                        enumsString += `,${inputChoice.trim()}`;
                    }
                })
            }

            formItem['name'] = questionLabel.replace(/\s/g, '');
            formItem['label.value'] = questionLabel;
            formItem['placeholder'] = 'Select One';
            formItem['fieldType'] = 'select';
            formItem['enum'] = enumsString;
            formItem['enumsNames'] = enumsString;
            formItem['events.click'] = '';
            // formItem['isRequired'] = 'true';
            formData.push(formItem);
        }

       
    }
    return formData;
  }

  //add click event to button
  submitBtn.addEventListener('click', (event) => {
    let userEmail = localStorage.getItem("email");
    let formTitleElement = document.getElementById("my-form-title");
    let formTitle = formTitleElement.textContent;
    let formData = getFormData();

    if (formData.length == 0) {
      alert("form data is empty")
    } else if (formTitleElement.textContent === null || formTitleElement.textContent === undefined || formTitleElement.textContent.trim()==='') {
        alert("form title is empty")
    } else {
         postFranklinFormData(formData, userEmail, formTitle.trim());
    }
  });
}

const postFranklinFormData = async (data, userEmail, formTitle) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=utf-8");
  var spinner = document.getElementById('spinner');
  spinner.style.display = 'flex';

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    // mode: 'no-cors',
    redirect: 'follow'
  };

  let URL = FORM_EXPRESS_BACKEND_URL + `requestType=createform&formTitle=${formTitle}&email=${userEmail}`;

  fetch(encodeURI(URL), requestOptions)
    .then(response => response.text())
    .then(result => handleFormSubmissionResult(result))
    .catch(error => handleFormSubmissionResultError(error));
}

const handleFormSubmissionResult = (result) => {
  var spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
  console.log(result);

  const resultDetails = JSON.parse(result);

  let successDiv = document.createElement("div");
  successDiv.classList.add("success-div")

  let successIcon = document.createElement("img");
  successIcon.classList.add("success-icon");
  successIcon.src = 'data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check" viewBox="0 0 16 16">     <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>   </svg>';

  let successMessage = document.createElement("p");
  successMessage.classList.add("success-message")
  successMessage.textContent = "Your form is successfully created";

  let formButton = document.createElement("a");
  formButton.classList.add("success-button");
  formButton.setAttribute("target","_blank");
  formButton.textContent="View Form";
  formButton.href=resultDetails.formPublishURL

  let formFolder = document.createElement("a");
  formFolder.classList.add("success-button");
  formFolder.setAttribute("target","_blank");
  formFolder.textContent="Manage Form";
  formFolder.href= resultDetails.folderURL;

  successDiv.appendChild(successIcon);
  successDiv.appendChild(successMessage);
  successDiv.appendChild(formButton);
  successDiv.appendChild(formFolder);

  updateUserForms( resultDetails.formTitle , resultDetails.formPublishURL, resultDetails.folderURL , resultDetails.resultSheetUrl );
  createFormContainer.replaceChildren(successDiv);
}

const handleFormSubmissionResultError = (error) => {
  var spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
  console.log(error);
}

const getFormSubmissionSuccessDiv = (successMessage) => {
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  h2.textContent = successMessage;
  div.appendChild(h2);
  return div;
}

function testbox() {
  let formElement = getTextBoxElement();
  createFormContainer.insertBefore(formElement, createFormContainer.lastChild);
  addSubmitButton();
}

// testbox();

// ******* LOGIN CONTAINER ******* //


function showSideContainer() {
    const options = document.getElementById("options");
    const option1 = document.getElementById("option-1");
    const option2 = document.getElementById("option-2");
    const option3 = document.getElementById("option-3");

    option1 && option1.addEventListener("click", () => { questionCreator("text"); });
    option2 && option2.addEventListener("click", () => { questionCreator("radio"); });
    option3 && option3.addEventListener("click", () => { questionCreator("checkbox"); });


    let addNewBtn = document.getElementById("plus-btn");
    addNewBtn && addNewBtn.addEventListener("click", () => {
        if (options.classList.contains('hidden')) {
            options.classList.remove("hidden");
        } else {
            options.classList.add("hidden");
        }
       
        options.style.animationFillMode = "fadeout"
    });
}


function showLoginContainer() {
  let ele = loginContainer.getElementsByTagName("img")[0];
  ele.src =
    'data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="green" class="bi bi-arrow-right" viewBox="0 0 16 16">  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>';
  ele.addEventListener("click", loginSubmissionHandler);
  loginContainer.style.display = "block";

}

const loginSubmissionHandler = () => {
  const userEmailElement = document.getElementById("user-email-id");
  const emailId = userEmailElement.value;
  if (!/@gmail\.com$/.test(emailId)) {
    userEmailElement.style.borderBlockStyle = "solid";
    userEmailElement.style.borderColor = "red";
  } else {
    localStorage.setItem("email", emailId);
    startExpressFlow();
  }
};

const startExpressFlow = () => {
  let userEmail = localStorage.getItem("email");
  if (userEmail === undefined || userEmail === null) {
    formNavContainer.style.display = "none";
    sideContainer.style.display = "none";
    createFormContainer.style.display = 'none';
    showLoginContainer();
  } else {
    loginContainer.style.display="none"; 
    createFormContainer.style.display = 'block';
    showLoggedInPage();
    document.getElementById("user-welcome-title").textContent = `Welcome ${userEmail}`;
    
  }
}

startExpressFlow();

function testLoginContainer() {
  let loginContainer = getLoginContainer();
  formActionContainer.appendChild(loginContainer);
}

// testLoginContainer();

function showLoggedInPage() {
    sideContainer.style.display = "block";
    formNavContainer.style.display = "block";

    showSideContainer();

    const tabContainer = document.querySelector(".tab-container");
    const tabs = tabContainer.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and tab contents
        tabs.forEach((t) => t.classList.remove("active"));
        // Add active class to clicked tab and corresponding tab content
        tab.classList.add("active");
        const title = tab.dataset.title;
        switch (title) {
          case "New Form":
            showFomCreatorContainer();
            break;
          case "My forms":
            showMyForms();
            break;
          case "preview":
            showFormPreview();
            break;
          default:
            break;
        }
      });
    });
}


function showFomCreatorContainer() {
    sideContainer.style.display = "block";
    createFormContainer.style.display = "block";
    previewContainer.style.display = "none";
    myFormsContainer.style.display = "none";
}

function showMyForms() {
   sideContainer.style.display = "none";
   createFormContainer.style.display = "none";
   previewContainer.style.display = "none";
   myFormsContainer.style.display = "block";

   const formList = document.getElementById("form-list");

   let userEmail = localStorage.getItem('email');
   const forms =  getUserForms(userEmail);
   myFormsContainer.innerHTML = '';
   forms.then((resultJson)=>{
            resultJson.forEach(form => {
            const row = document.createElement("div");
            row.classList.add("form-row");
        
            const title = document.createElement("a");
            title.classList.add("form-title");
            title.innerText = form.FormTitle;
            title.href = form.FormPublishlink;
            title.target = "_blank";
        
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");
        
            const folderLink = document.createElement("a");
            folderLink.classList.add("form-button");
            folderLink.innerText = "Franklin Folder";
            folderLink.href = form.formFolderLink;
            folderLink.target = "_blank";
       
            const successSheetLink = document.createElement("a");
            successSheetLink.classList.add("form-button");
            successSheetLink.innerText = "Results";
            successSheetLink.href = form.resultSheetURL;
            successSheetLink.target = "_blank";
         

            buttonContainer.appendChild(folderLink);
            buttonContainer.appendChild(successSheetLink);
        
            row.appendChild(title);
            row.appendChild(buttonContainer);
        
            myFormsContainer.appendChild(row);
        });
    });
   
}


async function getUserForms( userEmail ) {

     let cachedForms = localStorage.getItem(`userForm-${userEmail}`);

     if ( cachedForms !== undefined && cachedForms !== null)
       return JSON.parse(cachedForms);

    let URL = FORM_EXPRESS_BACKEND_URL + `requestType=getforms&email=${userEmail}`;

    const response = await fetch(URL);
    const data = await response.json();
  
    // Assuming that the response is an array of objects in the format you provided
    const forms = data.map(item => {
      return {
        "FormTitle": item.FormTitle,
        "FormPublishlink": item.FormPublishURL,
        "formFolderLink": item.FormFolderURL,
        "resultSheetUrl": item.resultSheetUrl
      };
    });

    localStorage.setItem(`userForm-${userEmail}`, JSON.stringify(forms));
  
    return forms;
}
  

function showFormPreview() {
    sideContainer.style.display = "none";
    createFormContainer.style.display = "none";
    previewContainer.style.display = "block";
    myFormsContainer.style.display = "none";
}

function updateUserForms(formTitle , formPublishLink, formFolderURL, resultSheetUrl) {
    let userEmail = localStorage.getItem('email');
    let cachedForms = localStorage.getItem(`userForm-${userEmail}`);
    if ( cachedForms !== undefined && cachedForms !== null) {
        let userForms =  JSON.parse(cachedForms);
        
        let addedForm = {};
        addedForm["FormTitle"] = formTitle,
        addedForm["FormPublishlink"] = formPublishLink,
        addedForm["formFolderLink"] = formFolderURL,
        addedForm["resultSheetUrl"] = resultSheetUrl,
        userForms.push(addedForm);
        localStorage.setItem(`userForm-${userEmail}`, JSON.stringify(userForms));
    }
}
