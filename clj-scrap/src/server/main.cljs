(ns server.main
  (:require [kitchen-async.promise :as p]
            ["puppeteer" :as puppeteer])
)

(defn reload! []
  (println "Code updated.")

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
