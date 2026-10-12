import { useState } from "react";
import { CircleLoader } from "react-spinners";
import { defaultLinkShortener } from "./api";
import linkImage from "./assets/blueLink.svg";
import "./App.css";

function App() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    if (!longURL) {
      setError("Please enter a URL to shorten.");
      setIsLoading(false);
      return;
    }

    try {
      const funcData = await defaultLinkShortener(longURL);
      setShortURL(funcData);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="layout">
        <main className="main">
          <div className="title">
            <h1>Shorten Any Link</h1>
            <img src={linkImage} alt="Blue Link Image from Wikipedia"></img>
          </div>
          <div className="linkShortener">
            <h2>Type the URL you want to shorten</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="longURL"
                name="longURL"
                placeholder="https://www.youtube.com/"
                required
                value={longURL}
                onChange={(event) => setLongURL(event.target.value)}
              />
              <button type="submit" disabled={isLoading}>
                {!isLoading ? (
                  "Submit"
                ) : (
                  <CircleLoader
                    color="#6366f1"
                    size={25}
                    speedMultiplier={1.6}
                  />
                )}
              </button>
            </form>
            <div className="answer">
              {error ? (
                <p>{error && `API Error: ${error}`}</p>
              ) : isLoading ? (
                <p>Loading...</p>
              ) : (
                <p>{shortURL && `Shortened URL: ${shortURL}`}</p>
              )}
            </div>
          </div>
          <div className="description">
            <p>
              This Website is powered by{" "}
              <a href="https://da.gd/">https://da.gd/</a>, an open-source link
              shortener dating back to 2011. The link shortener was created by
              Rick Elrod; all credit goes toward him. He accepts donations at{" "}
              <a href="https://buymeacoffee.com/relrod">Buy Me A Coffee</a>.
            </p>
          </div>
        </main>
        <footer className="footer">
          <div className="footerL">
            <div className="footerElements">
              <div>
                <a href="https://github.com/lmu-cmsi2021-fall2026/generic-api-backed-themothershipp/tree/main">
                  GitHub Repo
                </a>
              </div>
              <div>
                <a href="https://github.com/Themothershipp">GitHub Profile</a>
              </div>
            </div>
          </div>
          <div className="footerR">
            <div className="footerElements">
              <p>Copyright (c) 2026 themothershipp</p>
              <a href="https://github.com/lmu-cmsi2021-fall2026/generic-api-backed-themothershipp/blob/main/LICENSE">
                MIT License
              </a>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
export default App;
