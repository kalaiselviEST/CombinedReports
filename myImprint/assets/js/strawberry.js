window.designMode = true;
window.strawberry = new Strawberry();


function workspaceCallback() {
  strawberry.tooltipToggler();
  strawberry.fieldsetToggler();
  strawberry.fieldsetSwitch();
  strawberry.tabTriggers();
  strawberry.dropdownSelectToggler();
  strawberry.dropdownSelectListImageToggler();
  strawberry.dropdownFormBubbler();
  preventEmptyHash();
  //strawberry.sidebar.workspace.toggler(); //Will be handled in document click event (delegation)

  strawberry.buttonSelectToggler();
}

function strawberryLoad() {
  //Execute necessary methods
  strawberry.sidebar.windowSizer();
  strawberry.sidebar.toggler();
  strawberry.sidebar.submenuToggler();
  strawberry.toast.init();

  if (window.designMode) {
    strawberry.workspace.initRef();
  }

  strawberry.tooltipToggler();
  strawberry.fieldsetToggler();
  strawberry.fieldsetSwitch();
  strawberry.tabTriggers();
  preventEmptyHash();
  strawberry.dropdownFormBubbler();
  strawberry.sidebar.workspace.toggler();

  strawberry.buttonSelectToggler();
}

strawberry.workspace.generalCallback = workspaceCallback;
window.onload = strawberryLoad;


function getQueryParam(param) {
  var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < url.length; i++) {
    var urlparam = url[i].split('=');
    if (urlparam[0] == param) {
      return urlparam[1];
    }
  }
}


function preventEmptyHash() {
  $('a[href="#"]').click(function (e) { e.preventDefault(); })
}

//typeof checkers
function isObject(value) {
  return value && typeof value === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function isDateObj(value) {
  return (value instanceof Date)
}


$("#cTask6").on('change', function() {
    if ($(this).is(':checked')) {  
        $('.capture-emails').show();
        $('.show-emails').hide();
    }
    else {
       $('.capture-emails').hide();
      $('.show-emails').show();
    }
});

$("#cTask9").on('change', function() {
  if ($(this).is(':checked')) {  
      $('.capture-emailsOne').show();
      $('.show-emailsOne').hide();
  }
  else {
     $('.capture-emailsOne').hide();
    $('.show-emailsOne').show();
  }
});