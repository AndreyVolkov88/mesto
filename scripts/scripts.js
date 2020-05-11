const popup = document.querySelector('.pop-up');
const closeIcon = popup.querySelector('.pop-up__close-icon');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
const form = document.querySelector('.form');
let formInputName = form.querySelector('.form__input_name');
let formInputProfession = form.querySelector('.form__input_profession');


function setInputValue() {
  formInputName.value = profileTitle.textContent;
  formInputProfession.value = profileSubtitle.textContent;
  console.log(formInputName.value);
}

function openPopup() {
  popup.classList.add('pop-up_opened');
  setInputValue();
}

function closePopup() {
  popup.classList.remove('pop-up_opened');
}

editButton.addEventListener('click', openPopup);
closeIcon.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputProfession.value;
  closePopup();
}

form.addEventListener('submit', formSubmitHandler);
