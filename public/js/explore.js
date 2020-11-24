$(document).ready(() => {
  // Renders current Travel Tip Articles from Bing News API
  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?q=travel%20advice&count=4",
    method: "GET",
    headers: {
      "x-rapidapi-key": "1d36e97f15msh84e42135ae7724bp19746cjsnc902ee504019",
      "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com"
    }
  };

  $.ajax(settings).done(response => {
    // console.log(response);
    // console.log(summary);
    const results = response.value;
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      const articleDiv = $("<div>").attr("class", "card col-sm-3");
      const h = $("<h3>").text(results[i].name);
      const img = $("<img>")
        .attr("src", results[i].image.thumbnail.contentUrl)
        .attr("class", "card-img");
      const btn = $("<a>")
        .attr("class", "btn btn-primary")
        .attr("href", results[i].url)
        .attr("target", "_blank")
        .text("Read more...");
      articleDiv.append(img);
      articleDiv.append(h);
      articleDiv.append(btn);
      $("#topArticles").append(articleDiv);
    }
  });

  // Render unusual vacation ideas through Web Search API
  const settingsIdeas = {
    async: true,
    crossDomain: true,
    url:
      "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?pageSize=4&q=unusual%20vacation%20ideas&autoCorrect=true&pageNumber=1&toPublishedDate=null&fromPublishedDate=null",
    method: "GET",
    headers: {
      "x-rapidapi-key": "931ec6c6a9msh0876431e9d4df04p1d10c5jsndd0985d90c67",
      "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
    }
  };

  $.ajax(settingsIdeas).done(response => {
    // console.log(response);
    // console.log(summary);
    const results = response.value;
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      const articleDiv = $("<div>").attr("class", "card col-sm-3");
      const h = $("<h3>").text(results[i].title);
      const host = $("<h4>").text("Source: " + results[i].provider.name);
      const btn = $("<a>")
        .attr("class", "btn btn-primary")
        .attr("href", results[i].url)
        .attr("target", "_blank")
        .text("Read more...");
      articleDiv.append(h);
      articleDiv.append(host);
      articleDiv.append(btn);
      $("#ideas").append(articleDiv);
    }
  });

  // Render current Outdoor Articles from National Parks Services
  const queryNPS =
    "https://developer.nps.gov/api/v1/articles?limit=4&start=0&api_key=JktWkNNegm9cBFdtGHJDqjTFfg4aGDJ4qpUyUjry";
  $.ajax({
    url: queryNPS,
    method: "GET"
  }).then(response => {
    const results = response.data;
    console.log(results);

    for (let i = 0; i < results.length; i++) {
      const articleDiv = $("<div>").attr("class", "card col-sm-3");
      const h = $("<h3>").text(results[i].title);
      const img = $("<img>")
        .attr("src", results[i].listingImage.url)
        .attr("class", "card-img nps");
      const btn = $("<a>")
        .attr("class", "btn btn-primary")
        .attr("href", results[i].url)
        .attr("target", "_blank")
        .text("Find out more...");
      articleDiv.append(img);
      articleDiv.append(h);
      articleDiv.append(btn);

      $("#outdoors").append(articleDiv);
    }
  });

  // Access latitude and longitude coordinates based on user's IP address
  const settingsIP = {
    async: true,
    crossDomain: true,
    url: "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/",
    method: "GET",
    headers: {
      "x-rapidapi-key": "931ec6c6a9msh0876431e9d4df04p1d10c5jsndd0985d90c67",
      "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com"
    }
  };

  $.ajax(settingsIP).done(response => {
    const lat = response.latitude;
    const long = response.longitude;

    // Render nearby places to stay from AirBnB API (limited to 10 requests per day)
    const settingsAir = {
      async: true,
      crossDomain: true,
      url:
        "https://airbnb-com.p.rapidapi.com/listings/nearby/" +
        lat +
        "/" +
        long +
        "?offset=0&locale=en-US&min_price=0&max_price=5000&max_guests=1&check_in=2021-02-25&radius=5&currency=USD&check_out=2021-02-26",
      method: "GET",
      headers: {
        "x-rapidapi-key": "1d36e97f15msh84e42135ae7724bp19746cjsnc902ee504019",
        "x-rapidapi-host": "airbnb-com.p.rapidapi.com"
      }
    };

    $.ajax(settingsAir).done(response => {
      // console.log(response);
      const results = response.listings;
      console.log(results);

      for (let i = 0; i < 4 && i < results.length; i++) {
        const articleDiv = $("<div>").attr("class", "card col-sm-3");
        const h = $("<h3>").text(results[i].listing.localized_city);
        const img = $("<img>")
          .attr("src", results[i].listing.picture_urls[0])
          .attr("class", "card-img air");
        const btn = $("<a>")
          .attr("class", "btn btn-primary")
          .attr(
            "href",
            "https://www.airbnb.com/rooms/" +
              results[i].listing.id +
              "?source_impression_id=p3_1605971675_baJ62RDekLhZpddK"
          )
          .attr("target", "_blank")
          .text("Find out more...");
        articleDiv.append(img);
        articleDiv.append(h);
        articleDiv.append(btn);
        $("#stay").append(articleDiv);
      }
    });
  });
});
