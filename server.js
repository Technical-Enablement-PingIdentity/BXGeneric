/**
* This is the main Node.js server script for your project
* Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
*/
const got = require('got');    
const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
* Our home page route
*
* Returns src/index.hbs with data built into it
*/
fastify.get("/", function(request, reply) {
  reply.view("/src/index.hbs", { 
    showRemixButton: process.env.SHOW_REMIX_BUTTON === 'true',
    dvApiBaseUrl: process.env.DV_API_HOSTNAME,
    dvJsFile: process.env.DV_JS_LOCATION,
    helloPolicyKey: process.env.HELLO_POLICY_KEY,
    loginPolicyKey: process.env.LOGIN_POLICY_KEY,
    registerPolicyKey: process.env.REGISTER_POLICY_KEY,
    glitchRemixProject: process.env.GLITCH_REMIX_PROJECT
  });
});

/**
* Our POST route to handle and react to form submissions 
*
* Accepts body data indicating the user choice
*/
fastify.post("/", function(request, reply) {
  
  // Build the params object to pass to the template
  let params = { seo: seo };
  
  
  reply.view("/src/index.hbs", params);
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});



// Retrieve the token needed to invoke a Widget flow
fastify.get('/getSkToken', (req, reply) => {
  getSkToken(skToken =>{
    reply.send({
      skToken: skToken.access_token, 
      companyId: `${process.env.DV_COMPANY_ID}`,
      dvApiBaseUrl: process.env.DV_API_HOSTNAME
    })
  })
})

// Get a Company sdkToken
function getSkToken(cb){
  var myURL = `${process.env.DV_API_HOSTNAME}/v1/company/${process.env.DV_COMPANY_ID}/sdkToken`;
  got(myURL, {
    headers: {
      "X-SK-API-KEY": `${process.env.DV_API_KEY}`  
    },
    method: "GET"
  })
    .json()
    .then(data => cb(data))
    .catch(err => console.log("Error: ", err));
}

