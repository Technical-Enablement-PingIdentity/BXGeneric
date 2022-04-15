// prevent lint errors
var singularkey;

// The keys on the window object are loaded from .env, feel free to change here!
const helloFlowPolicyKey = window.helloPolicyKey;
const loginFlowPolicyKey = window.loginPolicyKey;
const registerFlowPolicyKey = window.registerPolicyKey;

// load this Hello Widget
invokeWidget(helloFlowPolicyKey, 'hellobox');

configureEventListener('registerLink', 'widgetbox', registerFlowPolicyKey);
configureEventListener('loginLink', 'widgetbox', loginFlowPolicyKey);

function configureEventListener(btnId, containerId, flowPolicyKey, params) {
  const btn = document.getElementById(btnId);
  if (btn && flowPolicyKey) {
    btn.addEventListener('click', (e) => {
      window.bxg_sendAnalytics('button_click', { button_text: e.target.alt === 'Remix on Glitch' ? e.target.alt : e.target.text });
      invokeWidget(flowPolicyKey, containerId, params);
    }, false);
  }
}

// Invoke the Widget with the desired Flow
function invokeWidget(policyId, divId, params) {
  fetch('/getSkToken')
    .then(res => res.json())
    .then(data => {
      var props= { 
        config: { 
          method: 'runFlow', 
          apiRoot: `${data.dvApiBaseUrl}/v1`, 
          accessToken: data.skToken, 
          companyId: data.companyId,
          policyId: policyId
        }, 
        useModal: false, 
        successCallback, errorCallback, onCloseModal 
      };

      if (params) {
        props.config.parameters = params;
      }
        
      // Cleanup widget containers
      singularkey.cleanup(document.getElementById('widgetbox'));
      singularkey.cleanup(document.getElementById('hellobox'));

      // Invoke Singular Key Widget
      singularkey.skRenderScreen(document.getElementById(divId), props) 
    })  
}

function successCallback(response){
   // add Success Events here
   console.log("successCallback: ", JSON.stringify(response, null, 2))
   singularkey.cleanup(document.getElementById("widgetbox")) 
   singularkey.cleanup(document.getElementById("remixBox"))
}

function errorCallback(error){
  // add Failure Events here
  console.log("errorCallback: ", JSON.stringify(error, null, 2))
  singularkey.cleanup(document.getElementById("widgetbox")) 
}

function onCloseModal(response){
  // add onClose Events here
  console.log("onCloseModal")
  console.log("response", JSON.stringify(response, null, 2))
  singularkey.cleanup(document.getElementById("widgetbox")) 
}

document.addEventListener('click', function (e){
  // Modal backdrop click closes modal
  if(e.target && e.target.id === 'widgetbox') {
    singularkey.cleanup(document.getElementById("widgetbox"));
    invokeWidget(helloFlowPolicyKey, 'hellobox');
  }
});

// load the Remix Widget
configureEventListener('remix-bx-link', 'widgetbox', '3ed9d9b5eebdfe52eb2d566afd79e074', { GlitchProject: window.glitchRemixProject });
