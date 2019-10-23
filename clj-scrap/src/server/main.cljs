(ns server.main
  (:require [kitchen-async.promise :as p]
            ["puppeteer" :as puppeteer])
)

; (def url "https://lemonde.fr")
(def url "https://linuxfr.org")

(defn scrap []

  (p/let [browser (puppeteer/launch)
  page (.newPage browser)]
    (.goto page url)
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
