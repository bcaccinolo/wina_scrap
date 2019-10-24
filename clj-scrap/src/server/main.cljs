(ns server.main
  (:require [kitchen-async.promise :as p]
            ["puppeteer" :as puppeteer])
)

; (def url "https://lemonde.fr")
; (def url "https://linuxfr.org")
(def url "https://www.winamax.fr/paris-sportifs/calendar/4")

(def viewport #js{:width 800 "height" 3000})

(def load_selector "body")
(def section_selector "#app-inner > div > div:nth-child(1) > span > div > div:nth-child(2) > section.event-list")
(def list_selector (str section_selector " > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child")

(defn scrap []
  (p/let [browser (puppeteer/launch)
          page (.newPage browser)]
    (.setViewport page viewport)
    (.goto page url)

    (p/then (.waitForSelector page list_selector)
            (fn [x] (js/console.log "Match list loaded"))
    )

    (.screenshot page #js{:path "screenshot2.png"})
    (.close browser))
)

(defn reload! []
  (println "Code updated.")
  (scrap)
  (println "Done!")
)

(defn main! []
  (println "App loaded!")
  (scrap)
  (println "Done!")
)
