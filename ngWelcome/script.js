// Code goes here
var work = function() {
  console.log("working hard!")
};

var doWork = function(f) {
  console.log("starting");

  try {
    f();
  } catch (ex) {
    console.log(ex);
  }

  console.log("end");
};

doWork(work);