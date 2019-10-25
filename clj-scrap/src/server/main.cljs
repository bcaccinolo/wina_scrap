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
(def list_selector (str section_selector " > div:nth-of-type(2) > div:first-child > div:first-child > div:first-child"))
(def match_selector (str list_selector " > div"))
(def link_selector "div:first-child > a")
(def info_selector (str link_selector " > div > div:first-child"))
(def players_selector (str info_selector " > div:first-child"))
(def icon_selector (str players_selector " > svg"))

;; Utils
(defn innerText [element]
  (-> (.evaluate element (fn [node] (.-innerText node)))
    (p/then (fn [text] (prn text)))
    (p/catch* (fn [reason] (prn "parseMatchBlock 🚨!" reason)))
  )
  )

(defn extractPlayers [element]
  (prn "extracting players")
  (-> (.$eval element players_selector (fn [node] (.-textContent node)))
    (p/then (fn [text] (prn text)))
    (p/catch* (fn [reason] (prn "parseMatchBlock 🚨!" reason)))
  )
)

(defn extractLink [element]
  (prn "extracting link")
  (-> (.$eval element link_selector (fn [node] (.-href node)))
    (p/then (fn [text] (prn text)))
    (p/catch* (fn [reason] (prn "parseMatchBlock 🚨!" reason)))
  )
)

(defn extractIcon [element]
  (prn "extracting Icon")
  (-> (.$eval element icon_selector (fn [node] (.-classList node)))
    (p/then (fn [text] (prn text)))
    (p/catch* (fn [reason] (prn "parseMatchBlock 🚨!" reason)))
  )
)

(defn parseMatchBlock [element]
  ; (extractLink element)
  ; (extractPlayers element)
  (extractIcon element)
)

(defn parsePage [page]
  (-> (.$$ page match_selector)
    (p/then
      (fn [r]
        (def vect (js->clj r))
        (mapv parseMatchBlock vect)
        ))
    (p/catch* (fn [reason] (prn "parsePage 🚨!" reason)))
))

(defn scrap []
  (p/let [browser (puppeteer/launch (clj->js {"headless" true}))
          page (.newPage browser)]
    (.setViewport page viewport)
    (.goto page url)

    (p/then (.waitForSelector page list_selector)
            (fn [x] (js/console.log "Match list loaded")))

    (parsePage page)

    ; (.screenshot page #js{:path "screenshot2.png"})
    ; (.close browser)
  )
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
