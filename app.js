async function analyze() {

  const url = document.getElementById("urlInput").value.toLowerCase()

  const result = document.getElementById("result")

  result.innerHTML = "Analyzing..."

  let platform = "unknown"

  if (url.includes("kalshi")) platform = "kalshi"
  if (url.includes("polymarket")) platform = "polymarket"
  if (url.includes("gemini")) platform = "gemini"
  if (url.includes("coinbase")) platform = "coinbase"

  if (platform === "polymarket") {

    try {

      const slug = url.split("/event/")[1]

      const api = `https://gamma-api.polymarket.com/events/${slug}`

      const res = await fetch(api)

      const data = await res.json()

      const market = data.markets[0]

      let html = `
        <h2>${data.title}</h2>
        <p><b>Volume:</b> $${data.volume}</p>
        <h3>Outcomes</h3>
      `

      market.outcomes.forEach(o => {

        html += `
          <p>
            ${o.name} — ${Math.round(o.price * 100)}%
          </p>
        `

      })

      result.innerHTML = html

    } catch (err) {

      result.innerHTML = "Could not fetch Polymarket data."

    }

  }

  else {

    result.innerHTML =
      "Platform detected but data fetching not added yet."

  }

}
