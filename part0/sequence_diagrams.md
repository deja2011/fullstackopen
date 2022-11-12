# 0.4: New Note

```mermaid
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_code
server-->browser: 302 Redirect to /exampleapp/notes
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"hello","date":"2022-11-12T09:15:59.301Z"}, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

# 0.5: Single page app

```mermaid
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"hello","date":"2022-11-12T09:15:59.301Z"}, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

# 0.6: New note

```mermaid
note over browser:
browser starts executing js-code
that add the new note to the DOM
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: 201 {message: "note created"}
```