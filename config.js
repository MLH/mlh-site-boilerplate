const config = {
    template: "./src/index.hbs",
    filename: "./index.html",
    mobile: true,
    site: {
      title: "", // Add site title here
      description: "", // Add site description here
      baseurl: "/",
      url: "http://*.mlh.io",
      custom_class: ""
    },
    tracking: {
      google_analytics_id: "", // Example: UA-43729070-14
      twitter_id: "", // Example: "nv0ih"
      facebook_id: "", // Example: 261635320842380
    }
}

module.exports = config;