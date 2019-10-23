(ns server.main
  (:require [kitchen-async.promise :as p]
            ["puppeteer" :as puppeteer])
)

(def value-a 2)

(defonce value-b 2)

(defn reload! []
  (println "Code updated.")
  (println "Trying values:" value-a value-b)

  (p/let [browser (puppeteer/launch)
          page (.newPage browser)]
    (.goto page "https://lemonde.fr")
    (.screenshot page #js{:path "screenshot2.png"})
    (.close browser))

  (println "Done!")
)

(defn main! []
  (println "App loaded!")

  (p/let [browser (puppeteer/launch)
          page (.newPage browser)]
    (.goto page "https://www.google.com")
    (.screenshot page #js{:path "screenshot.png"})
    (.close browser))

  (println "Done!")
)
