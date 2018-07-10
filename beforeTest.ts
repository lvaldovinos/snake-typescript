const events = {};

window.alert = (message) => console.log(message)

document.events = events

document.addEventListener = (event, cb) => {
  events[event] = cb;
});
